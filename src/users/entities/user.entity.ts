import Model from '@/common/entities/base.entity';
import { Todo } from '@/todos/entities/todo.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends Model {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  profilePicture: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  age?: number;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
