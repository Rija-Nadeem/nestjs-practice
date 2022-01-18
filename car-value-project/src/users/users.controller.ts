import {
  Controller,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  Get,
  Session,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private service: UsersService, private auth: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.auth.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) { 
    const user = await this.auth.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('whoAmI')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: Users) {
    return user;
  }
  // async getUser(@Session() session: any){
  //   const user = await this.service.findOne(session.userId);
  //   return user;
  // }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const record = await this.service.findOne(parseInt(id));
    if (!record) {
      throw new NotFoundException('User not found');
    }
    return record;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.service.find(email);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.update(parseInt(id), body);
  }
}
