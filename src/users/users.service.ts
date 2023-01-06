import { Injectable, Inject } from '@nestjs/common';

import {
  USERS_DB_SERVICE,
  UsersDbService,
} from './../shared/dependencies/users-db-service';

import { FullUserType } from '../shared/types/full-user.type';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserFactory } from '../shared/factories/user.factory';
import { UserWithoutPasswordType } from '../shared/types/user-without-password.type';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_DB_SERVICE)
    private readonly usersDbService: UsersDbService,
  ) {}

  public async getOneByEmail(email: string): Promise<FullUserType | null> {
    const userDbRecordOrNull = await this.usersDbService.findOneByEmail(email);

    if (userDbRecordOrNull === null) {
      return null;
    }

    const factory = new UserFactory(userDbRecordOrNull);
    return factory.buildFullUser();
  }

  public async createOne(
    createUserDto: CreateUserDto,
  ): Promise<UserWithoutPasswordType> {
    const newUserDbRecord = await this.usersDbService.insertOne(createUserDto);
    const factory = new UserFactory(newUserDbRecord);
    return factory.buildUserWithoutPassword();
  }
}
