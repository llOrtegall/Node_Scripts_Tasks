import {createPool}  from "mysql2/promise"

export const pool = createPool({
    host: 'localhost', 
    user: 'root',
    password: '123456Asd.',
    port: 3306,
    database: 'companydb'
});
