import { Module } from '@nestjs/common';

import { MongodbModule } from '../mongodb/mongodb.module';
import { EncryptionModule } from '../encryption/encryption.module';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';

@Module({
  imports: [MongodbModule, EncryptionModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
