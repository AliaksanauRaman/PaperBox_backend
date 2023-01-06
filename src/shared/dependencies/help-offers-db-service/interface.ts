import { CreateHelpOfferDto } from '../../dtos/create-help-offer.dto';
import { HelpOfferDbRecordType } from '../../types/help-offer-db-record.type';
import { DbResultOfHelpOfferStatusUpdateType } from '../../types/db-result-of-help-offer-status-update.type';
import { HelpOfferStatus } from '../../enums/help-offer-status.enum';
import { DbResultOfHelpOfferArchiveType } from '../../types/db-result-of-help-offer-archive.type';

export interface HelpOffersDbService {
  getAll(): Promise<ReadonlyArray<HelpOfferDbRecordType>>;
  getAllPublished(): Promise<ReadonlyArray<HelpOfferDbRecordType>>;
  getOneById(helpOfferId: string): Promise<HelpOfferDbRecordType | null>;
  createOneUnpublished(
    createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferDbRecordType>;
  updateStatusOfOneWithId(
    helpOfferId: string,
    status: HelpOfferStatus,
  ): Promise<DbResultOfHelpOfferStatusUpdateType>;
  archiveOneWithId(
    helpOfferId: string,
  ): Promise<DbResultOfHelpOfferArchiveType>;
}
