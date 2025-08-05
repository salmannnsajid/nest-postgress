import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import Model from '@/common/entities/base.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order extends Model {
  @Column('decimal')
  amount: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}
