import { SpecificDateType } from '../types/specific-date.type';

// TODO: Unused
export class SpecificDate {
  private readonly type = 'specific';

  constructor(private readonly specificDateAsString: string) {}

  public getAsJSON(): SpecificDateType {
    return {
      type: this.type,
      specificDateAsString: this.specificDateAsString,
    };
  }
}
