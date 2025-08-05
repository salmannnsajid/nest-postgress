import { Column, Entity, OneToMany } from 'typeorm';
import Model from '@/common/entities/base.entity';
import { OrderItem } from '@/orders/entities/order-item.entity';

@Entity()
export class Product extends Model {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({ default: 0 })
  stock: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
