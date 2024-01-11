import { Request, Response } from 'express'
import { UserUseCase } from '../../app/userUseCase'

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
		} catch (error) {
			res.status(400).json({ error })
		}
	}

	public listController = async (req: Request, res: Response) => {
		try {
			const users = await this.UserUseCase.listUser()
			res.status(200).json({ users })
		} catch (error) {
			res.status(400).json({ error })
		}
	}
}
