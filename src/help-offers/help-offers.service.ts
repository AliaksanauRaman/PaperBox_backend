import { Injectable, Inject } from '@nestjs/common';

import {
  HELP_OFFERS_DB_SERVICE,
  HelpOffersDbService,
} from '../shared/dependencies/help-offers-db-service';

import { HelpOfferFullPreviewType } from '../shared/types/help-offer-full-preview.type';
import { HelpOfferFactory } from '../shared/factories/help-offer.factory';

@Injectable()
export class HelpOffersService {
  constructor(
    @Inject(HELP_OFFERS_DB_SERVICE)
    private readonly helpOffersDbService: HelpOffersDbService,
  ) {}

  public async getFullPreviewsOfAll(): Promise<
    Array<HelpOfferFullPreviewType>
  > {
    const allHelpOffersDbRecords = await this.helpOffersDbService.getAll();
    return allHelpOffersDbRecords
      .map((dbRecord) => new HelpOfferFactory(dbRecord))
      .map((factory) => factory.buildFullPreview());
  }
}
