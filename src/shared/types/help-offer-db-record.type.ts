import { HelpOfferStatus } from '../enums/help-offer-status.enum';
import { DateRangeType } from './date-range.type';
import { PhoneType } from './phone.type';
import { SpecificDateType } from './specific-date.type';

export type HelpOfferDbRecordType = Readonly<{
  _id: string;
  authorFullName: string;
  countryFrom: string;
  cityFrom: string;
  countryTo: string;
  cityTo: string;
  status: HelpOfferStatus;
  phones: ReadonlyArray<PhoneType>;
  date: SpecificDateType | DateRangeType;
  createdAt: Date;
  lastModified: Date;
  comment: string;
}>;
