import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  create(@Body() userDto: CreateUserDto) {
    console.log(userDto);

    return this.userService.createUser(userDto);
  }
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
