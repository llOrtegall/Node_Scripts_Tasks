import { getUserByEmail, registerUser } from '../services/user.services'
import { Request, Response } from 'express'

const inserUser = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const user = await registerUser(body);
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'No se pudo crear el usuario' });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const user = await getUserByEmail(email as string);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'No se pudo obtener el usuario' });
    }
};

export { getUser, inserUser };