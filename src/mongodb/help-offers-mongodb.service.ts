import { Injectable, Inject } from '@nestjs/common';
import { Db, UpdateResult } from 'mongodb';

import { DB_INSTANCE } from './dependencies/db-instance';

import { HelpOffersDbService } from '../shared/dependencies/help-offers-db-service';
import { UniqueIdGeneratorService } from './../shared/services/unique-id-generator.service';
import { HelpOfferDbRecordType } from '../shared/types/help-offer-db-record.type';
import { HelpOfferStatus } from '../shared/enums/help-offer-status.enum';
import { CreateHelpOfferDto } from '../shared/dtos/create-help-offer.dto';
import { UpdatedHelpOfferResponseType } from './../shared/types/updated-help-offer-response.type';

const HELP_OFFERS_COLLECTION_NAME = 'help-offers';

@Injectable()
export class HelpOffersMongodbService implements HelpOffersDbService {
  private readonly helpOffersCollection =
    this.mongodbInstance.collection<HelpOfferDbRecordType>(
      HELP_OFFERS_COLLECTION_NAME,
    );

  constructor(
    @Inject(DB_INSTANCE)
    private readonly mongodbInstance: Db,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
  ) {}

  public async getAll(): Promise<Array<HelpOfferDbRecordType>> {
    const cursor = await this.helpOffersCollection.find();
    const allHelpOffersDbRecords = await cursor.toArray();
    return allHelpOffersDbRecords;
  }

  public async getAllPublished(): Promise<Array<HelpOfferDbRecordType>> {
    const allHelpOffersDbRecords = await this.getAll();
    return allHelpOffersDbRecords.filter(
      ({ status }) => status === HelpOfferStatus.PUBLISHED,
    );
  }

  public async getOneById(helpOfferId: string): Promise<HelpOfferDbRecordType> {
    const helpOfferDbRecord = await this.helpOffersCollection.findOne({
      _id: helpOfferId,
    });
    return helpOfferDbRecord;
  }

  public async createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferDbRecordType> {
    const helpOfferId = this.uniqueIdGeneratorService.generate();
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
      createdAt: new Date(),
      lastModified: new Date(),
      comment: createHelpOfferDto.comment,
    };
    await this.helpOffersCollection.insertOne(helpOfferDbRecord);
    return helpOfferDbRecord;
  }

  public async publishOne(
    helpOfferId: string,
  ): Promise<UpdatedHelpOfferResponseType> {
    await this.updateHelpOfferStatus(helpOfferId, HelpOfferStatus.PUBLISHED);
    return { id: helpOfferId };
  }

  public async unpublishOne(
    helpOfferId: string,
  ): Promise<UpdatedHelpOfferResponseType> {
    await this.updateHelpOfferStatus(helpOfferId, HelpOfferStatus.UNPUBLISHED);
    return { id: helpOfferId };
  }

  public async rejectOne(
    helpOfferId: string,
  ): Promise<UpdatedHelpOfferResponseType> {
    await this.updateHelpOfferStatus(helpOfferId, HelpOfferStatus.REJECTED);
    return { id: helpOfferId };
  }

  private async updateHelpOfferStatus(
    helpOfferId: string,
    status: HelpOfferStatus,
  ): Promise<UpdateResult> {
    const updateResult = await this.helpOffersCollection.updateOne(
      { _id: helpOfferId },
      {
        $set: { status },
        $currentDate: { lastModified: true },
      },
    );
    return updateResult;
  }
}
