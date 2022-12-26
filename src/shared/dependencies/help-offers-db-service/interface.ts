import { HelpOfferDbRecordType } from '../../types/help-offer-db-record.type';

export interface HelpOffersDbService {
  getAll(): Promise<Array<HelpOfferDbRecordType>>;
  getAllPublished(): Promise<Array<unknown>>;
  getOneById(helpOfferId: string): Promise<unknown>;
  createOneUnpublished(createHelpOfferDto: unknown): Promise<unknown>;
  publishOne(helpOfferId: string): Promise<unknown>;
  unpublishOne(helpOfferId: string): Promise<unknown>;
}
