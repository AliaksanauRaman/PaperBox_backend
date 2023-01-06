import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { EncryptionModule } from '../encryption/encryption.module';

import { AuthenticationController } from './authentication.controller';

import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, UsersModule, EncryptionModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {}
