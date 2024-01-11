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

export const UserById = async (uuid: string) => {
	try {
		const pool = await DBInitMysql()
		const sql = 'SELECT * FROM Users WHERE uuid = ?'

		const [user] = await pool.query(sql, [uuid])
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}

export const UsersList = async () => {
	try {
		const pool = await DBInitMysql()
		const sql = 'SELECT * FROM Users'

		const [users] = await pool.query(sql)
		return users
	} catch (error) {
		console.log(error)
		return error
	}
}