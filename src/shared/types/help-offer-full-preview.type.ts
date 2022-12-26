import { HelpOfferDbRecordType } from './help-offer-db-record.type';

export type HelpOfferFullPreviewType = { readonly id: string } & Omit<
  HelpOfferDbRecordType,
  '_id' | 'phones' | 'cityFrom' | 'cityTo' | 'comment'
>;
