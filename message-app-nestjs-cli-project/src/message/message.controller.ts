import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {

  constructor(private services: MessageService){}

  @Get()
  listMessages(){
    return this.services.getAll()
  }

  @Post()
  reateMessage(@Body() body: CreateMessageDto){
    return this.services.createMessage(body.content)
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string){
    // console.log('result', id)
    const message = await this.services.findOne(id);
    console.log('message', message)
    if(!message){
      console.log('in if loop')
      throw new NotFoundException('Message not found');
    }
    return message;
  }
}
