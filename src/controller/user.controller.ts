import { getUserByEmail, registerUser } from '../services/user.services'
import { Request, Response } from 'express'

const inserUser = async (req: Request, res: Response) => {
    const { body } = req;
    const user = await registerUser(body);
    res.send({ user });
};

const getUser = async (req: Request, res: Response) => {
    const { email } = req.query;
    const user = await getUserByEmail(email as string);
    res.send({ user });
};

export { getUser, inserUser };