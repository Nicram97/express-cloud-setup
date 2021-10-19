import { User } from "../entity/user";
import { dbConnection } from "../db/dbService";

export const addUser = async (body: {userName: string, description: string}) => {
    const userRepository = dbConnection.getRepository(User);
    try {
        let user = userRepository.create({
            userName: body.userName,
            description: body.description
        });
        await userRepository.save(user);
    } catch(e) {
        console.error('Error in adding user', e);
        throw e;
    }
};

export const getUserById = async (id: number): Promise<User> => {
    const userRepository = dbConnection.getRepository(User);
    return userRepository.findOne(id);
}

export const getAllUsers = async (): Promise<User[]> => {
    const userRepository = dbConnection.getRepository(User);
    return userRepository.find();
}