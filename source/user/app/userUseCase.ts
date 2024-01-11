import { UserRepository } from '../domain/user.repository'
import { UserValue } from '../domain/user.value'

/**
 * * Casos de uso son los que se encargan de orquestar la lógica de negocio
 * ! aplicacion puede conocer dominio, pero dominio no puede conocer aplicacion. y a su vez aplicación no puede conocer infraestructura
 */

export class UserUseCase {
	// ? inyección de dependencias ya que esta clase depende de un repositorio que está en dominio
	constructor(private readonly userRepository: UserRepository) { }

	public registerUser = async ({ name, email, description }: { name: string, email: string, description?: string }) => {
		const userValue = new UserValue({ name, email, description })
		const userCreated = await this.userRepository.registerUser(userValue)
		return userCreated
	}

	public getDetailUser = async (uuid: string) => {
		const user = await this.userRepository.findUserById(uuid)
		return user
	}

	public listUser = async () => {
		const users = await this.userRepository.listUser()
		return users
	}
}