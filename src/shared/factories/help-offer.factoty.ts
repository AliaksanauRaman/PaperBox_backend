import { DateRangeType } from './../types/date-range.type';
import { SpecificDateType } from './../types/specific-date.type';
import { HelpOfferStatus } from './../enums/help-offer-status.enum';
import { HelpOfferDbRecordType } from '../types/help-offer-db-record.type';
import { PhoneType } from '../types/phone.type';
import { HelpOfferPreviewType } from '../types/help-offer-preview.type';
import { PublishedHelpOfferPreviewType } from '../types/published-help-offer-preview.type';

export class HelpOfferFactory {
  private readonly id: string;
  private readonly authorFullName: string;
  private readonly countryFrom: string;
  private readonly cityFrom: string;
  private readonly countryTo: string;
  private readonly cityTo: string;
  private readonly status: HelpOfferStatus;
  private readonly phones: ReadonlyArray<PhoneType>;
  private readonly date: SpecificDateType | DateRangeType;
  private readonly createdAt: Date;
  private readonly lastModified: Date;
  private readonly comment: string;

  constructor(helpOfferDbRecordType: HelpOfferDbRecordType) {
    this.id = helpOfferDbRecordType._id;
    this.authorFullName = helpOfferDbRecordType.authorFullName;
    this.countryFrom = helpOfferDbRecordType.countryFrom;
    this.cityFrom = helpOfferDbRecordType.cityFrom;
    this.countryTo = helpOfferDbRecordType.countryTo;
    this.cityTo = helpOfferDbRecordType.cityTo;
    this.status = helpOfferDbRecordType.status;
    this.phones = helpOfferDbRecordType.phones;
    this.date = helpOfferDbRecordType.date;
    this.createdAt = helpOfferDbRecordType.createdAt;
    this.lastModified = helpOfferDbRecordType.lastModified;
    this.comment = helpOfferDbRecordType.comment;
  }

  public buildPreview(): HelpOfferPreviewType {
    return {
      id: this.id,
      authorFullName: this.authorFullName,
      countryFrom: this.countryFrom,
      countryTo: this.countryTo,
      status: this.status,
      date: this.date,
      createdAt: this.createdAt,
      lastModified: this.lastModified,
    };
  }

  public buildPreviewOfPublished(): PublishedHelpOfferPreviewType {
    return {
      id: this.id,
      authorFullName: this.authorFullName,
      countryFrom: this.countryFrom,
      countryTo: this.countryTo,
      date: this.date,
    };
  }
}
