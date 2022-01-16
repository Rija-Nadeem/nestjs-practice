import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(Users) private repo: Repository<Users>){}

  create(email: string, password: string){
    const user = this.repo.create({email, password});
    return this.repo.save(user);
  }

   findOne(id: number){
    // return this.repo.findOne({email: 'abc@gmail.com'})
    return this.repo.findOne(id)
   }

   
   find(email: string){
    return this.repo.find({email})
   }

   async update(id: number, attrs: Partial<Users>){
     const record = await this.findOne(id);
     if(!record){
       throw new NotFoundException('User not found')
     }
     Object.assign(record, attrs)
     return this.repo.save(record);
   }

   async remove(id: number){
    const record = await this.findOne(id);
    if(!record){
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(record);
  }

}
