import { Controller, Post, Body, Param, Query, Delete, Patch, Get, NotFoundException } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.service.create(body.email, body.password);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string){
    const record = await this.service.findOne(parseInt(id));
     if(!record){
       throw new NotFoundException('User not found')
     }
    return record;
  }

  @Get()
  find(@Query('email') email: string){
    return this.service.find(email);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string){
    return this.service.remove(parseInt(id))
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto){
    return this.service.update(parseInt(id), body)
  }
}
