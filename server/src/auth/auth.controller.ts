import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {    
    return this.authService.login(userDto);
  }

}
