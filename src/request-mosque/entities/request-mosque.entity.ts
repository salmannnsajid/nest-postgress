import Model from '@/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class RequestMosque extends Model {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  contactPerson?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';
}
