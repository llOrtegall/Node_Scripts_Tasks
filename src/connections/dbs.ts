import { createPool } from 'mysql2/promise'
import 'dotenv/config'

export const pool_metas = createPool({
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
})

export const pool_test = createPool({
  host: process.env.DB_HOST_TEST as string,
  port: parseInt(process.env.DB_PORT_TEST as string),
  user: process.env.DB_USER_TEST as string,
  password: process.env.DB_PASS_TEST as string,
  database: process.env.DB_NAME_TEST as string,
})