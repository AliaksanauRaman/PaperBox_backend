import { CreateHelpOfferDto } from '../../dtos/create-help-offer.dto';
import { HelpOfferDbRecordType } from '../../types/help-offer-db-record.type';
import { DbResultOfHelpOfferStatusUpdateType } from '../../types/db-result-of-help-offer-status-update.type';
import { HelpOfferStatus } from '../../enums/help-offer-status.enum';
import { DbResultOfHelpOfferArchiveType } from '../../types/db-result-of-help-offer-archive.type';

export interface HelpOffersDbService {
  findAll(): Promise<ReadonlyArray<HelpOfferDbRecordType>>;
  findAllPublished(): Promise<ReadonlyArray<HelpOfferDbRecordType>>;
  findOneById(helpOfferId: string): Promise<HelpOfferDbRecordType | null>;
  insertOneUnpublished(
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
