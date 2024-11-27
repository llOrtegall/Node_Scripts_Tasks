import { Sequelize } from 'sequelize'

// Verificar si las variables de entorno están definidas
const requiredEnvVars = ['DB_TEST_HOST', 'DB_TEST_USER', 'DB_TEST_PASS', 'DB_TEST_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Error: Las siguientes variables de entorno no están definidas: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const HOST = process.env.DB_TEST_HOST as string;
const USER = process.env.DB_TEST_USER as string;
const PASS = process.env.DB_TEST_PASS as string;
const NAME = process.env.DB_TEST_NAME as string;

const connection = new Sequelize(NAME, USER, PASS, {
  host: HOST,
  dialect: 'mysql',
  port: 9010,
  timezone: '-05:00',
  logging: false
});

export default connection;