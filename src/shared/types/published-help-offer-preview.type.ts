import { HelpOfferDbRecordType } from './help-offer-db-record.type';

export type PublishedHelpOfferPreviewType = { readonly id: string } & Omit<
  HelpOfferDbRecordType,
  | '_id'
  | 'phones'
  | 'cityFrom'
  | 'cityTo'
  | 'comment'
  | 'createdAt'
  | 'lastModified'
  | 'status'
>;
