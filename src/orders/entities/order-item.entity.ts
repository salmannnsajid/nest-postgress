import { Entity, ManyToOne, Column } from 'typeorm';
import { Order } from '@/orders/entities/order.entity';
import { Product } from '@/products/entities/product.entity';
import Model from '@/common/entities/base.entity';

@Entity()
export class OrderItem extends Model {
  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @Column()
  quantity: number;
}
