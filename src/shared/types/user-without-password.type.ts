import { UserDbRecordType } from './user-db-record.type';

export type UserWithoutPasswordType = { readonly id: string } & Omit<
  UserDbRecordType,
  '_id' | 'encryptedPassword'
>;
