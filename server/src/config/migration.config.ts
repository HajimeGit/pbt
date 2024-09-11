import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './database.config';
import 'dotenv/config';

export default new DataSource(getDatabaseConfig());
