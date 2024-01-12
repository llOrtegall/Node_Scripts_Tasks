import { UserUseCase } from '../../app/userUseCase'
import { Request, Response } from 'express'
import { handleError } from './utilsErrors'

export class UserController {
	constructor(private UserUseCase: UserUseCase) { }

	public getController = async ({ query }: Request, res: Response) => {
		try {
			const { uuid = '' } = query
			const user = await this.UserUseCase.getDetailUser(`${uuid}`)
			if (user === null) {
				return res.status(404).json({ message: 'User not found by uuid' })
			}
			res.status(200).json({ user })
		} catch (error) {
			res.status(400).json({ error })
		}
	}

	public insertController = async ({ body }: Request, res: Response) => {
		try {
			const user = await this.UserUseCase.registerUser(body)
			res.status(200).json({ user })
		} catch (error: unknown) {
			handleError(error, res)
		}
	}

	public listController = async (req: Request, res: Response) => {
		try {
			const users = await this.UserUseCase.listUser()
			if(users !== null && users.length === 0) {
				return res.status(500).json({ message: 'Users not found' })
			}
			res.status(200).json({ users })
		} catch (error) {
			res.status(400).json({ error })
		}
	}
}
