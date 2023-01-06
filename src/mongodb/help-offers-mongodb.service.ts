import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

import { DB_INSTANCE } from './dependencies/db-instance';

import { HelpOffersDbService } from '../shared/dependencies/help-offers-db-service';
import { UniqueIdGeneratorService } from '../shared/services/unique-id-generator.service';
import { HelpOfferDbRecordType } from '../shared/types/help-offer-db-record.type';
import { HelpOfferStatus } from '../shared/enums/help-offer-status.enum';
import { CreateHelpOfferDto } from '../shared/dtos/create-help-offer.dto';
import { DbResultOfHelpOfferStatusUpdateType } from '../shared/types/db-result-of-help-offer-status-update.type';
import { ArchivedHelpOfferDbRecordType } from '../shared/types/archived-help-offer-db-record.type';
import { DbResultOfHelpOfferArchiveType } from '../shared/types/db-result-of-help-offer-archive.type';

const HELP_OFFERS_COLLECTION_NAME = 'help-offers';
const HELP_OFFERS_ARCHIVE_COLLECTION_NAME = 'help-offers-archive';

@Injectable()
export class HelpOffersMongodbService implements HelpOffersDbService {
  private readonly helpOffersCollection =
    this.mongodbInstance.collection<HelpOfferDbRecordType>(
      HELP_OFFERS_COLLECTION_NAME,
    );
  private readonly helpOffersArchiveCollection =
    this.mongodbInstance.collection<ArchivedHelpOfferDbRecordType>(
      HELP_OFFERS_ARCHIVE_COLLECTION_NAME,
    );

  constructor(
    @Inject(DB_INSTANCE)
    private readonly mongodbInstance: Db,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
  ) {}

  public async getAll(): Promise<ReadonlyArray<HelpOfferDbRecordType>> {
    const cursor = await this.helpOffersCollection.find();
    const allHelpOffersDbRecords = await cursor.toArray();

    return allHelpOffersDbRecords;
  }

  public async getAllPublished(): Promise<
    ReadonlyArray<HelpOfferDbRecordType>
  > {
    const allHelpOffersDbRecords = await this.getAll();

    return allHelpOffersDbRecords.filter(
      ({ status }) => status === HelpOfferStatus.PUBLISHED,
    );
  }

  public async getOneById(
    helpOfferId: string,
  ): Promise<HelpOfferDbRecordType | null> {
    return this.helpOffersCollection.findOne({
      _id: helpOfferId,
    });
  }

  public async createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferDbRecordType> {
    const helpOfferId = this.uniqueIdGeneratorService.generate();
    const now = new Date();
    const helpOfferDbRecord: HelpOfferDbRecordType = {
      _id: helpOfferId,
      authorFullName: createHelpOfferDto.authorFullName,
      countryFrom: createHelpOfferDto.countryFrom,
      cityFrom: createHelpOfferDto.cityFrom,
      countryTo: createHelpOfferDto.countryTo,
      cityTo: createHelpOfferDto.cityTo,
      status: HelpOfferStatus.UNPUBLISHED,
      phones: createHelpOfferDto.phones,
      date: createHelpOfferDto.date,
      createdAt: now,
      lastModified: now,
      comment: createHelpOfferDto.comment,
    };

    await this.helpOffersCollection.insertOne(helpOfferDbRecord);

    return helpOfferDbRecord;
  }

  public async updateStatusOfOneWithId(
    helpOfferId: string,
    status: HelpOfferStatus,
  ): Promise<DbResultOfHelpOfferStatusUpdateType> {
    const { matchedCount, modifiedCount } =
      await this.helpOffersCollection.updateOne(
        { _id: helpOfferId },
        {
          $set: { status },
          $currentDate: { lastModified: true },
        },
      );

    return {
      id: helpOfferId,
      newStatus: status,
      foundItemsCount: matchedCount,
      updatedItemsCount: modifiedCount,
    };
  }

  public async archiveOneWithId(
    helpOfferId: string,
  ): Promise<DbResultOfHelpOfferArchiveType> {
    const helpOfferDbRecord = await this.getOneById(helpOfferId);
    const now = new Date();
    const archivedHelpOfferDbRecord = {
      ...helpOfferDbRecord,
      archivedAt: now,
    };

    await this.helpOffersArchiveCollection.insertOne(archivedHelpOfferDbRecord);

    const { deletedCount } = await this.helpOffersCollection.deleteOne({
      _id: helpOfferDbRecord._id,
    });

    return {
      id: helpOfferId,
      archivedItem: archivedHelpOfferDbRecord,
      deletedItemsCount: deletedCount,
    };
  }
}
