import { HelpOfferDbRecordType } from './help-offer-db-record.type';

export type HelpOfferPreviewType = { readonly id: string } & Omit<
  HelpOfferDbRecordType,
  '_id' | 'phones' | 'cityFrom' | 'cityTo' | 'comment'
>;
