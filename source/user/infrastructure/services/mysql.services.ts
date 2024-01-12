import { UserEntity } from '../../domain/user.entity'
import type { RowDataPacket } from 'mysql2'

import { pool } from '../db/mysql'

export interface IUserRow extends UserEntity, RowDataPacket {
	id: number,
	createdAt: string,
	updatedAt: string
}

async function SelectQuery<T>(queryString: string): Promise<Partial<T[]>> {
	const [results] = await pool.execute(queryString)
	return results as T[]
}

export const getAllUsers = async () => {
	const users = await SelectQuery<IUserRow>('SELECT * FROM users')
	return users
}

export const getUserByID = async (uuid: string) => {
	const user = await SelectQuery<IUserRow>(`SELECT * FROM users WHERE uuid = '${uuid}'`)
	return user[0]
}

export const registerUser = async (user: UserEntity) => {
	const { name, email, description, uuid } = user

	const result = await SelectQuery<IUserRow>(`INSERT INTO users (name, email, description, uuid) VALUES ('${name}', '${email}', '${description}', '${uuid}')`)

	if (result === undefined) {
		throw new Error('Error al registrar usuario')
	}

	const searchUser = await getUserByID(uuid)
	return searchUser
}
