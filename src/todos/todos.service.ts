import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(dto: CreateTodoDto, user: User) {
    const todo = this.todoRepository.create({ ...dto, user });
    return this.todoRepository.save(todo);
  }

  findAllByUser(user: User) {
    return this.todoRepository.find({ where: { user: { id: user.id } } });
  }

  findOne(id: string) {
    return this.todoRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateTodoDto) {
    await this.todoRepository.update(id, dto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.todoRepository.delete(id);
  }
}
