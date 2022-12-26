import { ConfigService } from '@nestjs/config';

import { MongoClient } from 'mongodb';

export const dbInstanceFactory = async (configService: ConfigService) => {
  const mongodbConnectionUri = configService.get<string>(
    'MONGODB_CONNECTION_URI',
  );
  const dbName = configService.get<string>('DB_NAME');
  const dbClient = new MongoClient(mongodbConnectionUri);
  await dbClient.connect();
  return dbClient.db(dbName);
};
