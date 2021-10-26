import Router from "express-promise-router";
import * as actuator from "express-actuator"
import { actuatorOptions } from "../modules/actuator/actuatorService";
import { prometheusRouter } from "./prometheus";
import { userRouter } from "./user";
export const mainRouter = Router();

mainRouter.use('/users', userRouter);
mainRouter.use('/prometheus', prometheusRouter);
mainRouter.use(actuator(actuatorOptions))