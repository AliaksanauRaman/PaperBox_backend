import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HelpOffersModule } from './help-offers/help-offers.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), HelpOffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
