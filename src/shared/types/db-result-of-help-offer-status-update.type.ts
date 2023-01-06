import { HelpOfferStatus } from '../enums/help-offer-status.enum';

export type DbResultOfHelpOfferStatusUpdateType = Readonly<{
  id: string;
  newStatus: HelpOfferStatus;
  foundItemsCount: number;
  updatedItemsCount: number;
}>;
