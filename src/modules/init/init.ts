import { initDb } from "../../db/dbService"
import { initWinstonLogger } from "../../logger/logger";
import { sendPrometheusMetricsInterval } from "../metrics/influxService";

export const initDependencies = async () => {
    await initDb();
    await initWinstonLogger();
    sendPrometheusMetricsInterval(10 * 1000);
}