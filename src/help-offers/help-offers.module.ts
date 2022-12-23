import { Module } from '@nestjs/common';

import { HelpOffersController } from './help-offers.controller';

import { HelpOffersService } from './help-offers.service';

@Module({
  imports: [],
  controllers: [HelpOffersController],
  providers: [HelpOffersService],
})
export class HelpOffersModule {}
