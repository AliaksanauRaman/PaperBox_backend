import { Controller, Get } from '@nestjs/common';

import { HelpOffersService } from './help-offers.service';

@Controller('help-offers')
export class HelpOffersController {
  constructor(private readonly helpOffersService: HelpOffersService) {}

  @Get('/all-previews')
  public getAllPreviews(): Array<unknown> {
    return this.helpOffersService.getAllPreviews();
  }
}
