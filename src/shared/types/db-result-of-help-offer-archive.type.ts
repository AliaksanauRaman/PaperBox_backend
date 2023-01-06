import { ArchivedHelpOfferDbRecordType } from './archived-help-offer-db-record.type';

export type DbResultOfHelpOfferArchiveType = Readonly<{
  id: string;
  archivedItem: ArchivedHelpOfferDbRecordType;
  deletedItemsCount: number;
}>;
