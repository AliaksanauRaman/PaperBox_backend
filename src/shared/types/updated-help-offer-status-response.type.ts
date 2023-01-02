import { HelpOfferStatus } from '../enums/help-offer-status.enum';

export type UpdatedHelpOfferStatusResponse = Readonly<{
  id: string;
  newStatus: HelpOfferStatus;
}>;
