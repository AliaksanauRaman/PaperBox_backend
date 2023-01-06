import { FullUserType } from '../types/full-user.type';
import { UserDbRecordType } from '../types/user-db-record.type';
import { UserWithoutPasswordType } from '../types/user-without-password.type';

export class UserFactory {
  constructor(private readonly userDbRecord: UserDbRecordType) {}

  public buildFullUser(): FullUserType {
    return {
      id: this.userDbRecord._id,
      email: this.userDbRecord.email,
      encryptedPassword: this.userDbRecord.encryptedPassword,
      roles: this.userDbRecord.roles,
      createdAt: this.userDbRecord.createdAt,
      lastModified: this.userDbRecord.lastModified,
    };
  }

  public buildUserWithoutPassword(): UserWithoutPasswordType {
    return {
      id: this.userDbRecord._id,
      email: this.userDbRecord.email,
      roles: this.userDbRecord.roles,
      createdAt: this.userDbRecord.createdAt,
      lastModified: this.userDbRecord.lastModified,
    };
  }
}
