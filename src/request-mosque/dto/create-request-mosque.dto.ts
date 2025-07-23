import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestMosqueDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Masjid Al-Noor' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Johar Town, Lahore' })
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Salman Sajid' })
  contactPerson?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '+923044543016' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'This is the main Mosque of Johar Town' })
  notes?: string;

  @IsOptional()
  @IsEnum(['pending', 'accepted', 'rejected'])
  status?: 'pending' | 'accepted' | 'rejected';
}
