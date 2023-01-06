import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserWithoutPasswordType } from '../shared/types/user-without-password.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('one')
  public async createOne(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPasswordType> {
    return this.usersService.createOne(createUserDto);
  }
}
