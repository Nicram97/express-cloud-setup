import Router from "express-promise-router";
import { User } from "../entity/user";
import * as userService from "../modules/user/userService";
export const userRouter = Router();

/**
 * @openapi
 * /:
 *  get:
 *      description: Test
 *      responses:
 *          200:
 *              description: Returns present users.
 */
userRouter.get('/', async (req, res) => {
    const allUsers: User[] = await userService.getAllUsers();
    res.json(allUsers);
});

userRouter.get('/:id', async (req, res) => {
    const user: User = await userService.getUserById(parseInt(req.params.id));
    res.json(user);
});

userRouter.post('/', async (req, res) => {
    const result: User = await userService.addUser(req.body);
    res.json(result);
});