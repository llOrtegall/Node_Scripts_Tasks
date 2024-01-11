import { UserEntity } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'
import { createUser, UserById, UsersList } from '../services/user.services'

/**
 * TODO: capa de infractructura
 */


export class MysqlRepository implements UserRepository {
	async findUserById(uuid: string): Promise<any> {
		const user = await UserById(uuid)
		return user
	}
	async registerUser(userIn: UserEntity): Promise<any> {
		const user = await createUser(userIn)
		return user
	}

	async listUser(): Promise<any> {
		const users = await UsersList()

		return users
	}

} 