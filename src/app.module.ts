import { Module } from '@nestjs/common';

import { HelpOffersModule } from './help-offers/help-offers.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [HelpOffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
