import { UserModel } from '../model/user.schema';
import { UserInterface } from '../types/user.type';

/**
 * Registrar Usuario
 * @param user 
 * @returns 
 */
const registerUser = async (user: UserInterface) => {
    const response = await UserModel.create(user);
    return response;
}

/**
 * Consultar Usuario
 * @param user 
 * @returns 
 */
const getUserByEmail = async (email: string) => {
    const response = await UserModel.findOne({ email: email });
    return response;
}

export { registerUser, getUserByEmail };