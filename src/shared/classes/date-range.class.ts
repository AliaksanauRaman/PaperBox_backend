import { DateRangeType } from '../types/date-range.type';

// TODO: Unused
export class DateRange {
  private readonly type = 'range';

  constructor(
    private readonly dateFromAsString: string,
    private readonly dateToAsString: string,
  ) {}

  public getAsJSON(): DateRangeType {
    return {
      type: this.type,
      dateFromAsString: this.dateFromAsString,
      dateToAsString: this.dateToAsString,
    };
  }
}
