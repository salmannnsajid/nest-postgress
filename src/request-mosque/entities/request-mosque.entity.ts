import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RequestMosque {
  @PrimaryGeneratedColumn()
  id: number;

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
