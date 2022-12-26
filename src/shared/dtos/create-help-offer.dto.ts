import { DateRangeType } from '../types/date-range.type';
import { PhoneType } from '../types/phone.type';
import { SpecificDateType } from '../types/specific-date.type';

export type CreateHelpOfferDto = Readonly<{
  authorFullName: string;
  countryFrom: string;
  cityFrom: string;
  countryTo: string;
  cityTo: string;
  date: SpecificDateType | DateRangeType;
  phones: ReadonlyArray<PhoneType>;
  comment: string;
}>;
