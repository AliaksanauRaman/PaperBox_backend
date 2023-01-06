import { Module } from '@nestjs/common';

import { BcryptEncryptionService } from './bcrypt-encryption.service';
import { ENCRYPTION_SERVICE } from '../shared/dependencies/encryption-service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    BcryptEncryptionService,
    { provide: ENCRYPTION_SERVICE, useExisting: BcryptEncryptionService },
  ],
  exports: [ENCRYPTION_SERVICE],
})
export class EncryptionModule {}
