export interface EncryptionService {
  encryptString(plainString: string): Promise<string>;
  checkIfEqual(plainString: string, encryptedString: string): Promise<boolean>;
}
