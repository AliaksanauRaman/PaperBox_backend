import { HelpOfferDbRecordType } from './help-offer-db-record.type';

export type HelpOfferPublicPreviewType = { readonly id: string } & Omit<
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
