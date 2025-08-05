import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ProductQuantityDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity of the product to order' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 100.5 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'pending' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    example: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
    description: 'Array of product IDs with their quantities',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductQuantityDto)
  products: ProductQuantityDto[];
}
