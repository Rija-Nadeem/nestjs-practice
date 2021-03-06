import { Users } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Reports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({default: false})
  approved: boolean;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @ManyToOne(()=>Users, (user)=>user.reports)
  user: Users;
}
