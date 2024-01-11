import { UserEntity } from './user.entity'

/**
 * * Repositorio es una capa de abstracción que se encargará de comunicar el core del dominio con la infraestructura
 */

export interface UserRepository {
    findUserById(uuid: string): Promise<UserEntity | null>;
    registerUser(user: UserEntity): Promise<UserEntity | null>;
    listUser(): Promise<UserEntity[] | null>;
}