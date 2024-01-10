import { Request, Response } from 'express'
import { UserUseCase } from '../../app/userUseCase';

export class UserController {
    constructor(private UserUseCase: UserUseCase) {}

    public getController = async({ query }: Request, res: Response) => {
        const { uuid = '' } = query
        const user = await this.UserUseCase.getDetailUser(`${uuid}`)
        res.status(200).json({ user });
    }

    public insertController = async ({ body }: Request, res: Response) => {
        const user = await this.UserUseCase.registerUser(body)
        res.status(200).json({ user });
    }


}
