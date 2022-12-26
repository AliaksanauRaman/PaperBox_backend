import { Module } from '@nestjs/common';
import { MongodbModule } from './../mongodb/mongodb.module';

import { HelpOffersController } from './help-offers.controller';

import { HelpOffersService } from './help-offers.service';

@Module({
  imports: [MongodbModule],
  controllers: [HelpOffersController],
  providers: [HelpOffersService],
})
export class HelpOffersModule {}
