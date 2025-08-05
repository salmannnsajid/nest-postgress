import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from '@/products/entities/product.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(dto: CreateOrderDto, userId: string) {
    const productIds = dto.products.map((p) => p.productId);

    const products = await this.productRepository.findBy({
      id: In(productIds),
    });

    if (products.length === 0) {
      throw new NotFoundException('No valid products found');
    }

    // Validate and update stock
    const updatedProducts = products.map((product) => {
      const input = dto.products.find((p) => p.productId === product.id);
      if (!input) {
        throw new NotFoundException(
          `Product ID ${product.id} not found in input`,
        );
      }

      if (product.stock < input.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${product.name}. Available: ${product.stock}, Requested: ${input.quantity}`,
        );
      }

      product.stock -= input.quantity;
      return product;
    });

    // Save updated stock
    await this.productRepository.save(updatedProducts);

    // Create the Order
    const order = this.orderRepository.create({
      amount: dto.amount,
      status: dto.status,
      user: { id: userId },
    });

    await this.orderRepository.save(order);

    // Create OrderItems
    const orderItems = dto.products.map((p) => {
      const product = products.find((prod) => prod.id === p.productId);
      return this.orderItemRepository.create({
        order,
        product,
        quantity: p.quantity,
      });
    });

    await this.orderItemRepository.save(orderItems);

    return {
      ...order,
      orderItems,
    };
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
  }

  async findOrdersByUser(userId: string) {
    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
