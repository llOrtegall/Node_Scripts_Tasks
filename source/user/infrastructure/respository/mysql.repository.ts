import { UserEntity } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'

import { getAllUsers, getUserByID, registerUser } from '../db/mysql'

import { IUserRow } from '../db/mysql'

/**
 * TODO: capa de infractructura
 */


export class MysqlRepository implements UserRepository {
	async findUserById(uuid: string): Promise<IUserRow> {
		const user = await getUserByID(uuid)
		return user as IUserRow
	}

	async registerUser(userIn: UserEntity): Promise<IUserRow> {
		const user = await registerUser(userIn)
		console.log(user)
		return user.filter(u => u !== undefined)[0] as IUserRow
	}

	async listUser(): Promise<IUserRow[]> {
		const users = await getAllUsers()
		return users.filter((user): user is IUserRow => user !== undefined)
	}

} 