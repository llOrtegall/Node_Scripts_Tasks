import { createPool } from 'mysql2/promise';

const HOST = process.env.DB_HOST as string;
const USER = process.env.DB_USER as string;
const PASS = process.env.DB_PASS as string;
const NAME = process.env.DB_NAME as string;

export const pool = createPool({
  host: HOST,
  user: USER,
  password: PASS,
  database: NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
