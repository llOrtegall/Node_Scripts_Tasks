import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { createUser } from '../services/user.services'

/**
 * TODO: capa de infractructura
 */

export class MysqlRepository implements UserRepository {
    async findUserById(uuid: string): Promise<any> {
        // const user = await UserModel.findOne({ uuid })
        // return user
    }
    async registerUser(userIn: UserEntity): Promise<any> {
        const user = await createUser(userIn)
        return user
    }
    async listUser(): Promise<any> {
        // const user = await UserModel.find()
        // return user
    }

} 