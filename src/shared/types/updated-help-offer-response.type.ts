import { HelpOfferStatus } from '../enums/help-offer-status.enum';

export type UpdatedHelpOfferResponseType = Readonly<{
  id: string;
  newStatus: HelpOfferStatus;
}>;
