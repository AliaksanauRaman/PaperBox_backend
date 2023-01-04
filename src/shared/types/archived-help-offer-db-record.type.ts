import { HelpOfferDbRecordType } from './help-offer-db-record.type';

export type ArchivedHelpOfferDbRecordType = {
  readonly archivedAt: Date;
} & HelpOfferDbRecordType;
