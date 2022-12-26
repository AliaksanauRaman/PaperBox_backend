import { Controller, Get } from '@nestjs/common';

import { HelpOffersService } from './help-offers.service';

@Controller('help-offers')
export class HelpOffersController {
  constructor(private readonly helpOffersService: HelpOffersService) {}

  @Get('/full-previews-of-all')
  public async getFullPreviewsOfAll(): Promise<Array<unknown>> {
    return this.helpOffersService.getFullPreviewsOfAll();
  }
}
