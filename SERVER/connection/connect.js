import { Pool } from 'pg';
import config from '../config/index';

const connectionString = config.testDB;
const jwt = config.jwtSecretKey;
const client = new Pool({
  connectionString,
  jwt,
});

client.connect();

export default client;
