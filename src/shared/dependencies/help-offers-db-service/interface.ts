import { UpdatedHelpOfferDbResponseType } from './../../types/updated-help-offer-db-response.type';
import { CreateHelpOfferDto } from './../../dtos/create-help-offer.dto';
import { HelpOfferDbRecordType } from '../../types/help-offer-db-record.type';

export interface HelpOffersDbService {
  getAll(): Promise<Array<HelpOfferDbRecordType>>;
  getAllPublished(): Promise<Array<HelpOfferDbRecordType>>;
  getOneById(helpOfferId: string): Promise<HelpOfferDbRecordType>;
  createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferDbRecordType>;
  publishOne(helpOfferId: string): Promise<UpdatedHelpOfferDbResponseType>;
  unpublishOne(helpOfferId: string): Promise<UpdatedHelpOfferDbResponseType>;
  rejectOne(helpOfferId: string): Promise<UpdatedHelpOfferDbResponseType>;
}
