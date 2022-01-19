import { Reports } from 'src/reports/reports.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: true})
  admin: boolean;

  @OneToMany(()=>Reports,(report)=>report.user)
  reports: Reports[];

  @AfterInsert()
  logInsertion() {
    console.log('Item is inserted: ', this.id);
  }

  @AfterRemove()
  logRemoval() {
    console.log('Item is removed: ', this.id);
  }

  @AfterUpdate()
  logUpdation() {
    console.log('Item is updated: ', this.id);
  }
}
