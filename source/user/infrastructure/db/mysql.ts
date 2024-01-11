import { createPool } from 'mysql2/promise'

export const DBInitMysql = async () => {
    const pool = createPool({
        host: `${process.env.DB_HOST}`,
        port: parseInt(`${process.env.DB_PORT}`),
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_NAME}`,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
    console.log('Database connected')
    return pool
}