import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    if (user) {
      return user;
    }
    const candidat = await this.userService.createUser(userDto);
    return candidat;
  }
}
