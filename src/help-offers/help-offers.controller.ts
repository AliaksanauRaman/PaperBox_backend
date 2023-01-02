import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';

import { HelpOffersService } from './help-offers.service';

import { HelpOfferFullPreviewType } from './../shared/types/help-offer-full-preview.type';
import { HelpOfferPublicPreviewType } from './../shared/types/help-offer-public-preview.type';
import { CreateHelpOfferDto } from './../shared/dtos/create-help-offer.dto';
import { FullHelpOfferType } from '../shared/types/full-help-offer.type';
import { UpdateHelpOfferDto } from '../shared/dtos/update-help-offer-status.dto';
import { UpdatedHelpOfferStatusResponse } from '../shared/types/updated-help-offer-status-response.type';

@Controller('help-offers')
export class HelpOffersController {
  constructor(private readonly helpOffersService: HelpOffersService) {}

  @Get('/full-previews-of-all')
  public async getFullPreviewsOfAll(): Promise<
    Array<HelpOfferFullPreviewType>
  > {
    return this.helpOffersService.getFullPreviewsOfAll();
  }

  @Get('/public-previews-of-published')
  public async getPublicPreviewsOfPublished(): Promise<
    Array<HelpOfferPublicPreviewType>
  > {
    return this.helpOffersService.getPublicPreviewsOfPublished();
  }

  @Post('/create-one-unpublished')
  public async createOneUnpublished(
    @Body() createHelpOfferDto: CreateHelpOfferDto,
  ): Promise<HelpOfferPublicPreviewType> {
    return this.helpOffersService.createOneUnpublished(createHelpOfferDto);
  }

  @Get('/full/:helpOfferId')
  public async getOneFullById(
    @Param('helpOfferId') helpOfferId: string,
  ): Promise<FullHelpOfferType> {
    return this.helpOffersService.getOneFullById(helpOfferId);
  }

  @Patch('/update-status-of-one/:helpOfferId')
  public async publishOneWithId(
    @Param('helpOfferId') helpOfferId: string,
    @Body() updateHelpOfferDto: UpdateHelpOfferDto,
  ): Promise<UpdatedHelpOfferStatusResponse> {
    return this.helpOffersService.updateStatusOfOneWithId(
      helpOfferId,
      updateHelpOfferDto.newStatus,
    );
  }
}
