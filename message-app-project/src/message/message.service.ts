import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./message.repository";

@Injectable()
export class MessageService{

  constructor(private msgRepo: MessageRepository){}

 findOne(id: string){
  return this.msgRepo.findOne(id)
 }
 getAll() {
  return this.msgRepo.getAll()
 }

 createMessage(content: string){
 return this.msgRepo.createMessage(content)
 }
}