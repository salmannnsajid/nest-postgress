import Model from '@/common/entities/base.entity';
import { User } from '@/users/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Todo extends Model {
  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
