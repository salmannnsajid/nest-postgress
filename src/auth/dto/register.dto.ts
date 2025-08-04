import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'Salman Sajid' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Type(() => Number)
  age: number;

  @ApiProperty({ example: 'test@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+923001234567' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Address' })
  @IsString()
  address: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  profilePicture: any;

  @ApiProperty({
    description: 'Password',
    example: 'Password@1',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
