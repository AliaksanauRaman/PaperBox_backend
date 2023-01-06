import { UserDbRecordType } from './user-db-record.type';

export type FullUserType = { readonly id: string } & Omit<
  UserDbRecordType,
  '_id'
>;
