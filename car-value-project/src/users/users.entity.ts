import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class Users{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsertion(){
    console.log('Item is inserted: ', this.id)
  }

  @AfterRemove()
  logRemoval(){
    console.log('Item is removed: ', this.id)
  }

  @AfterUpdate()
  logUpdation(){
    console.log('Item is updated: ', this.id)
  }

}