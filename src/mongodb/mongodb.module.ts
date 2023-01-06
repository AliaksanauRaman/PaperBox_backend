import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { EncryptionModule } from '../encryption/encryption.module';

import { DB_INSTANCE, dbInstanceFactory } from './dependencies/db-instance';
import { HelpOffersMongodbService } from './help-offers-mongodb.service';
import { HELP_OFFERS_DB_SERVICE } from '../shared/dependencies/help-offers-db-service';
import { UsersMongodbService } from './users-mongodb.service';
import { USERS_DB_SERVICE } from '../shared/dependencies/users-db-service';
import { UniqueIdGeneratorService } from '../shared/services/unique-id-generator.service';

@Module({
  imports: [ConfigModule, EncryptionModule],
  providers: [
    {
      provide: DB_INSTANCE,
      inject: [ConfigService],
      useFactory: dbInstanceFactory,
    },
    HelpOffersMongodbService,
    { provide: HELP_OFFERS_DB_SERVICE, useExisting: HelpOffersMongodbService },
    UsersMongodbService,
    { provide: USERS_DB_SERVICE, useExisting: UsersMongodbService },
    UniqueIdGeneratorService,
  ],
  exports: [HELP_OFFERS_DB_SERVICE, USERS_DB_SERVICE],
})
export class MongodbModule {}
