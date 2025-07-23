import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}
