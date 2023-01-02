import { Injectable, Inject } from '@nestjs/common';

import {
  HELP_OFFERS_DB_SERVICE,
  HelpOffersDbService,
} from '../shared/dependencies/help-offers-db-service';

import { HelpOfferFullPreviewType } from '../shared/types/help-offer-full-preview.type';
import { HelpOfferPublicPreviewType } from '../shared/types/help-offer-public-preview.type';
import { HelpOfferFactory } from '../shared/factories/help-offer.factory';
import { CreateHelpOfferDto } from '../shared/dtos/create-help-offer.dto';
import { FullHelpOfferType } from '../shared/types/full-help-offer.type';
import { HelpOfferStatus } from '../shared/enums/help-offer-status.enum';
import { UpdatedHelpOfferStatusResponse } from '../shared/types/updated-help-offer-status-response.type';

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

  public async getPublicPreviewsOfPublished(): Promise<
    Array<HelpOfferPublicPreviewType>
  > {
    const publishedHelpOffersDbRecords =
      await this.helpOffersDbService.getAllPublished();
    return publishedHelpOffersDbRecords
      .map((dbRecord) => new HelpOfferFactory(dbRecord))
      .map((factory) => factory.buildPublicPreview());
  }

  public async createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferPublicPreviewType> {
    const newHelpOfferDbRecord =
      await this.helpOffersDbService.createOneUnpublished(createHelpOfferDto);
    const factory = new HelpOfferFactory(newHelpOfferDbRecord);
    return factory.buildPublicPreview();
  }

  public async getOneFullById(helpOfferId: string): Promise<FullHelpOfferType> {
    const helpOfferDbRecord = await this.helpOffersDbService.getOneById(
      helpOfferId,
    );
    const factory = new HelpOfferFactory(helpOfferDbRecord);
    return factory.buildFull();
  }

  public async updateStatusOfOneWithId(
    helpOfferId: string,
    newStatus: HelpOfferStatus,
  ): Promise<UpdatedHelpOfferStatusResponse> {
    return this.helpOffersDbService.updateStatusOfOneWithId(
      helpOfferId,
      newStatus,
    );
  }
}
