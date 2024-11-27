import { createPool } from 'mysql2/promise';

// Verificar si las variables de entorno están definidas
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Error: Las siguientes variables de entorno no están definidas: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

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