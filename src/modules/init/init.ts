import { ConfigService } from "../../config/configService";
import { initDb } from "../../db/dbService"
import { initWinstonLogger } from "../../logger/logger";
import { initInfluxConnection } from "../metrics/influxService";

export const initDependencies = async () => {
    ConfigService.loadConfigFile();
    await initDb();
    await initWinstonLogger();
    initInfluxConnection();
}