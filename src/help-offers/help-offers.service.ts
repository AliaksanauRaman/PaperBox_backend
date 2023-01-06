import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

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
import { UpdatedHelpOfferStatusResponseType } from '../shared/types/updated-help-offer-status-response.type';
import { DeletedHelpOfferResponseType } from '../shared/types/deleted-help-offer-response.type';

@Injectable()
export class HelpOffersService {
  constructor(
    @Inject(HELP_OFFERS_DB_SERVICE)
    private readonly helpOffersDbService: HelpOffersDbService,
  ) {}

  public async getFullPreviewsOfAll(): Promise<
    Array<HelpOfferFullPreviewType>
  > {
    const allHelpOffersDbRecords = await this.helpOffersDbService.findAll();
    return allHelpOffersDbRecords
      .map((dbRecord) => new HelpOfferFactory(dbRecord))
      .map((factory) => factory.buildFullPreview());
  }

  public async getPublicPreviewsOfPublished(): Promise<
    Array<HelpOfferPublicPreviewType>
  > {
    const publishedHelpOffersDbRecords =
      await this.helpOffersDbService.findAllPublished();
    return publishedHelpOffersDbRecords
      .map((dbRecord) => new HelpOfferFactory(dbRecord))
      .map((factory) => factory.buildPublicPreview());
  }

  public async createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferPublicPreviewType> {
    const newHelpOfferDbRecord =
      await this.helpOffersDbService.insertOneUnpublished(createHelpOfferDto);
    const factory = new HelpOfferFactory(newHelpOfferDbRecord);
    return factory.buildPublicPreview();
  }

  public async getOneFullById(helpOfferId: string): Promise<FullHelpOfferType> {
    const helpOfferDbRecordOrNull = await this.helpOffersDbService.findOneById(
      helpOfferId,
    );

    if (helpOfferDbRecordOrNull === null) {
      throw new NotFoundException(
        `Help offer with id '${helpOfferId}' is not found!`,
      );
    }

    const factory = new HelpOfferFactory(helpOfferDbRecordOrNull);
    return factory.buildFull();
  }

  public async updateStatusOfOneWithId(
    helpOfferId: string,
    status: HelpOfferStatus,
  ): Promise<UpdatedHelpOfferStatusResponseType> {
    const { foundItemsCount, updatedItemsCount, id, newStatus } =
      await this.helpOffersDbService.updateStatusOfOneWithId(
        helpOfferId,
        status,
      );

    if (foundItemsCount === 0) {
      throw new NotFoundException(
        `Help offer with id '${helpOfferId}' is not found!`,
      );
    }

    if (updatedItemsCount === 0) {
      throw new InternalServerErrorException(`No help offers were updated!`);
    }

    return { id, newStatus };
  }

  public async deleteOneWithId(
    helpOfferId: string,
  ): Promise<DeletedHelpOfferResponseType> {
    const { deletedItemsCount, id } =
      await this.helpOffersDbService.archiveOneWithId(helpOfferId);

    if (deletedItemsCount === 0) {
      throw new NotFoundException(
        `Help offer with id '${helpOfferId}' is not found!`,
      );
    }

    return { id };
  }
}
