import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

import { DB_INSTANCE } from './dependencies/db-instance';

import { HelpOffersDbService } from '../shared/dependencies/help-offers-db-service';
import { HelpOfferDbRecordType } from './../shared/types/help-offer-db-record.type';

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
  ) {}

  public async getAll(): Promise<Array<HelpOfferDbRecordType>> {
    const cursor = await this.helpOffersCollection.find();
    const helpOffers = await cursor.toArray();
    return helpOffers;
  }

  public async getAllPublished(): Promise<unknown[]> {
    throw new Error('Method not implemented.');
  }

  public async getOneById(helpOfferId: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public async createOneUnpublished(
    createHelpOfferDto: unknown,
  ): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public async publishOne(helpOfferId: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public async unpublishOne(helpOfferId: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}
