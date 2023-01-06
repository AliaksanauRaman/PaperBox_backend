import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { EncryptionService } from '../shared/dependencies/encryption-service';

@Injectable()
export class BcryptEncryptionService implements EncryptionService {
  private readonly saltRounds = 10;

  public async encryptString(plainString: string): Promise<string> {
    return hash(plainString, this.saltRounds);
  }

  public async checkIfEqual(
    plainString: string,
    encryptedString: string,
  ): Promise<boolean> {
    return compare(plainString, encryptedString);
  }
}
