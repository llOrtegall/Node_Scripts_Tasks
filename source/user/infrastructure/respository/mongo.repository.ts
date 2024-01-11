import { UserEntity } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'
import { UserModel } from '../model/user.schema'

/**
 * TODO: capa de infractructura
 */

export class MongoRepository implements UserRepository {
	async findUserById(uuid: string): Promise<UserEntity | null> {
		const user = await UserModel.findOne({ uuid })
		if (!user) {
			return null
		}
		return {
			uuid: user.uuid || '',
			name: user.name || '',
			email: user.email || '',
			description: user.description || '',
		}
	}
	async registerUser(userIn: UserEntity): Promise<UserEntity | null> {
		const user = await UserModel.create(userIn)
		if (!user) {
			return null
		}
		return {
			uuid: user.uuid || '',
			name: user.name || '',
			email: user.email || '',
			description: user.description || '',
		}
	}
	async listUser(): Promise<UserEntity[] | null> {
		const users = await UserModel.find()
		if (!users) {
			return null
		}
		return users.map(user => ({
			uuid: user.uuid || '',
			name: user.name || '',
			email: user.email || '',
			description: user.description || '',
		}))
	}
} 