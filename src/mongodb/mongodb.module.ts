import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DB_INSTANCE, dbInstanceFactory } from './dependencies/db-instance';
import { HelpOffersMongodbService } from './help-offers-mongodb.service';
import { HELP_OFFERS_DB_SERVICE } from '../shared/dependencies/help-offers-db-service';
import { UniqueIdGeneratorService } from './../shared/services/unique-id-generator.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DB_INSTANCE,
      inject: [ConfigService],
      useFactory: dbInstanceFactory,
    },
    HelpOffersMongodbService,
    { provide: HELP_OFFERS_DB_SERVICE, useExisting: HelpOffersMongodbService },
    UniqueIdGeneratorService,
  ],
  exports: [HELP_OFFERS_DB_SERVICE],
})
export class MongodbModule {}
