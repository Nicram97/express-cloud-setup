import Router from "express-promise-router";
import { User } from "../entity/user";
import * as userService from "../modules/userService";
export const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const allUsers: User[] = await userService.getAllUsers();
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