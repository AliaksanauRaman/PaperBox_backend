import { UpdatedHelpOfferResponseType } from './../../types/updated-help-offer-response.type';
import { CreateHelpOfferDto } from './../../dtos/create-help-offer.dto';
import { HelpOfferDbRecordType } from '../../types/help-offer-db-record.type';

export interface HelpOffersDbService {
  getAll(): Promise<Array<HelpOfferDbRecordType>>;
  getAllPublished(): Promise<Array<HelpOfferDbRecordType>>;
  getOneById(helpOfferId: string): Promise<HelpOfferDbRecordType>;
  createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferDbRecordType>;
  publishOne(helpOfferId: string): Promise<UpdatedHelpOfferResponseType>;
  unpublishOne(helpOfferId: string): Promise<UpdatedHelpOfferResponseType>;
  rejectOne(helpOfferId: string): Promise<UpdatedHelpOfferResponseType>;
}
