import { HelpOfferStatus } from '../enums/help-offer-status.enum';

export type UpdateHelpOfferDto = Readonly<{
  newStatus: HelpOfferStatus;
}>;
