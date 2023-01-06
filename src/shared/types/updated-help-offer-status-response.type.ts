import { HelpOfferStatus } from '../enums/help-offer-status.enum';

export type UpdatedHelpOfferStatusResponseType = Readonly<{
  id: string;
  newStatus: HelpOfferStatus;
}>;
