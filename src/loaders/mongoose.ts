import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../../config';
import logger from './logger';

export default async (): Promise<Db> => {
  try {
    const connection = await mongoose.connect(config.databaseURL);
    return connection.connection.db;
  } catch (e) {
    if(process.env.NODE_ENV !== 'test')
      throw e;
  }
};
