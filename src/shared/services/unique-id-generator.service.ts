import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UniqueIdGeneratorService {
  public generate(): string {
    return uuid();
  }
}
