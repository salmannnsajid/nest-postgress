import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Buy groceries',
  })
  @IsNotEmpty()
  title: string;
}
