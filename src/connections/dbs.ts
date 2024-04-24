import { createPool } from 'mysql2/promise'
import 'dotenv/config'

export const pool_metas = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

export const pool_test = createPool({
  host: process.env.DB_HOST_TEST,
  port: process.env.DB_PORT_TEST,
  user: process.env.DB_USER_TEST,
  password: process.env.DB_PASS_TEST,
  database: process.env.DB_NAME_TEST,
})