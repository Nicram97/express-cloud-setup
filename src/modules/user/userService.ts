import { User } from "../../entity/user";
import { dbConnection } from "../../db/dbService";
import { Cache } from "../../cache/cacheService";
import { logger } from "../../logger/logger";

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance
const userKey: string = 'getUsersKey';

export const addUser = async (body: {userName: string, description: string}): Promise<User> => {
    try {
        const userRepository = dbConnection.getRepository(User);
        let user = userRepository.create({
            userName: body.userName,
            description: body.description
        });
        await userRepository.save(user);
        cache.del(userKey);
        return user;
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
    try {
        const userRepository = dbConnection.getRepository(User);
        return await cache.get(userKey, (params) => userRepository.find(params));
    } catch(e) {
        logger.error(e);
    }
}