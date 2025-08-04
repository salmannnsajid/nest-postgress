import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: 'Updated title of the todo item',
    example: 'Buy vegetables',
  })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Completion status of the todo item',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
