import { IsEnum } from 'class-validator';

export class UpdateRequestStatusDto {
  @IsEnum(['accepted', 'rejected'])
  status: 'accepted' | 'rejected';
}
