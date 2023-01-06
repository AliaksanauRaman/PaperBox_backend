import { UserRole } from '../enums/user-role.enum';

export type UserDbRecordType = Readonly<{
  _id: string;
  email: string;
  encryptedPassword: string;
  roles: ReadonlyArray<UserRole>;
  createdAt: Date;
  lastModified: Date;
}>;
