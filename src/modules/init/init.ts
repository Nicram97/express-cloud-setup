import { initDb } from "../../db/dbService"
import { initWinstonLogger } from "../../logger/logger";

export const initDependencies = async () => {
    await initDb();
    await initWinstonLogger();
}