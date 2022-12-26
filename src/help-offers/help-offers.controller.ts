import { Controller, Get } from '@nestjs/common';

import { HelpOffersService } from './help-offers.service';

import { HelpOfferFullPreviewType } from './../shared/types/help-offer-full-preview.type';
import { HelpOfferPublicPreviewType } from './../shared/types/help-offer-public-preview.type';

@Controller('help-offers')
export class HelpOffersController {
  constructor(private readonly helpOffersService: HelpOffersService) {}

  @Get('/full-previews-of-all')
  public async getFullPreviewsOfAll(): Promise<
    Array<HelpOfferFullPreviewType>
  > {
    return this.helpOffersService.getFullPreviewsOfAll();
  }

  @Get('/public-previews-of-published')
  public async getPublicPreviewsOfPublished(): Promise<
    Array<HelpOfferPublicPreviewType>
  > {
    return this.helpOffersService.getPublicPreviewsOfPublished();
  }
}
