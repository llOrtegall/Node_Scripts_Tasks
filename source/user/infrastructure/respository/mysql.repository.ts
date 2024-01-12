import { UserEntity } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'

import { getAllUsers, getUserByID, registerUser } from '../services/mysql.services'
import { IUserRow } from '../services/mysql.services'

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
		return user as IUserRow
	}

	async listUser(): Promise<IUserRow[]> {
		const users = await getAllUsers()
		return users.filter((user): user is IUserRow => user !== undefined)
	}
}
