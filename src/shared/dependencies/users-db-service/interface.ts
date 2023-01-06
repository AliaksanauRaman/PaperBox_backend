import { UserDbRecordType } from '../../types/user-db-record.type';
import { CreateUserDto } from '../../dtos/create-user.dto';

export interface UsersDbService {
  findOneByEmail(email: string): Promise<UserDbRecordType | null>;
  insertOne(createUserDto: CreateUserDto): Promise<UserDbRecordType>;
}
