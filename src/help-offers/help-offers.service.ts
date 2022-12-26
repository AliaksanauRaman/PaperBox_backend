import { Injectable, Inject } from '@nestjs/common';

import {
  HELP_OFFERS_DB_SERVICE,
  HelpOffersDbService,
} from '../shared/dependencies/help-offers-db-service';

@Injectable()
export class HelpOffersService {
  constructor(
    @Inject(HELP_OFFERS_DB_SERVICE)
    private readonly helpOffersDbService: HelpOffersDbService,
  ) {}

  public async getAllPreviews(): Promise<Array<unknown>> {
    const all = await this.helpOffersDbService.getAll();

    return all;
  }
}
