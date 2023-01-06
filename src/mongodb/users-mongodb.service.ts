import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

import { UsersDbService } from '../shared/dependencies/users-db-service/interface';
import { UniqueIdGeneratorService } from '../shared/services/unique-id-generator.service';
import { DB_INSTANCE } from './dependencies/db-instance';
import {
  EncryptionService,
  ENCRYPTION_SERVICE,
} from '../shared/dependencies/encryption-service';

import { UserDbRecordType } from '../shared/types/user-db-record.type';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { UserRole } from '../shared/enums/user-role.enum';

const USERS_COLLECTION_NAME = 'users';

@Injectable()
export class UsersMongodbService implements UsersDbService {
  private readonly usersCollection =
    this.mongodbInstance.collection<UserDbRecordType>(USERS_COLLECTION_NAME);

  constructor(
    @Inject(DB_INSTANCE)
    private readonly mongodbInstance: Db,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: EncryptionService,
  ) {}

  public async findOneByEmail(email: string): Promise<UserDbRecordType | null> {
    return this.usersCollection.findOne({ email });
  }

  public async insertOne(
    createUserDto: CreateUserDto,
  ): Promise<UserDbRecordType> {
    const userId = this.uniqueIdGeneratorService.generate();
    const now = new Date();
    const encryptedPassword = await this.encryptionService.encryptString(
      createUserDto.password,
    );
    const userDbRecord: UserDbRecordType = {
      _id: userId,
      email: createUserDto.email,
      encryptedPassword,
      roles: [UserRole.ADMIN],
      createdAt: now,
      lastModified: now,
    };

    await this.usersCollection.insertOne(userDbRecord);

    return userDbRecord;
  }
}
