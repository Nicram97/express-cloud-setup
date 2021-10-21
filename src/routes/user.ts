import Router from "express-promise-router";
import { User } from "../entity/user";
import * as userService from "../modules/user/userService";
import { logger } from "../logger/logger"
export const userRouter = Router();

userRouter.get('/', async (req, res) => {
    logger.error('siema');
    const allUsers: User[] = await userService.getAllUsers();
    throw new Error('elooo');
    res.json(allUsers);

});

userRouter.get('/:id', async (req, res) => {
    const user: User = await userService.getUserById(parseInt(req.params.id));
    res.json(user);
});

userRouter.post('/', async (req, res) => {
    await userService.addUser(req.body);
    res.send('User created');
});