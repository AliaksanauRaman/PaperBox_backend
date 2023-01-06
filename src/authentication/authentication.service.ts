import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import {
  ENCRYPTION_SERVICE,
  EncryptionService,
} from '../shared/dependencies/encryption-service';

import { UserWithoutPasswordType } from '../shared/types/user-without-password.type';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: EncryptionService,
  ) {}

  public async authenticateByCredentials(
    email: string,
    password: string,
  ): Promise<UserWithoutPasswordType> {
    const userOrNull = await this.usersService.getOneByEmail(email);

    if (userOrNull === null) {
      throw new UnauthorizedException('Email is incorrect!');
    }

    const passwordsAreEqual = await this.encryptionService.checkIfEqual(
      password,
      userOrNull.encryptedPassword,
    );

    if (!passwordsAreEqual) {
      throw new UnauthorizedException('Password is incorrect!');
    }

    const { encryptedPassword, ...userWithoutPassword } = userOrNull;
    return userWithoutPassword;
  }
}
