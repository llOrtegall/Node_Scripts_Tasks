import { UserEntity } from '../../domain/user.entity'
import { DBInitMysql } from '../db/mysql'

export const createUser = async (user: UserEntity) => {
	const { description, email, name, uuid } = user

	try {
		const pool = await DBInitMysql()
		const sql = 'INSERT INTO Users (uuid, name, email, description) VALUES (?, ?, ?, ?)'

		await pool.query(sql, [uuid, name, email, description])
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}