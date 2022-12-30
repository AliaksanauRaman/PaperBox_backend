import { HelpOfferDbRecordType } from './help-offer-db-record.type';

export type FullHelpOfferType = { readonly id: string } & Omit<
  HelpOfferDbRecordType,
  '_id'
>;
