import { createPool, Pool } from 'mysql2/promise'

let pool: Pool

export const DBInitMysql = async () => {
	if (!pool) {
		pool = createPool({
			host: `${process.env.DB_HOST}`,
			user: `${process.env.DB_USER}`,
			port: parseInt(`${process.env.DB_PORT}`),
			password: `${process.env.DB_PASSWORD}`,
			database: `${process.env.DB_NAME}`,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0
		})
		console.log('Database Mysql connected')
	}

	return pool
}