import { CreateHelpOfferDto } from '../../dtos/create-help-offer.dto';
import { HelpOfferDbRecordType } from '../../types/help-offer-db-record.type';
import { UpdatedHelpOfferStatusResponseType } from '../../types/updated-help-offer-status-response.type';
import { HelpOfferStatus } from '../../enums/help-offer-status.enum';
import { DeletedHelpOfferResponseType } from '../../types/deleted-help-offer-response.type';

export interface HelpOffersDbService {
  getAll(): Promise<Array<HelpOfferDbRecordType>>;
  getAllPublished(): Promise<Array<HelpOfferDbRecordType>>;
  getOneById(helpOfferId: string): Promise<HelpOfferDbRecordType>;
  createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferDbRecordType>;
  updateStatusOfOneWithId(
    helpOfferId: string,
    newStatus: HelpOfferStatus,
  ): Promise<UpdatedHelpOfferStatusResponseType>;
  archiveOneWithId(helpOfferId: string): Promise<DeletedHelpOfferResponseType>;
}
