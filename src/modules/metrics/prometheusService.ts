import * as promClient from "prom-client"
import { ConfigService } from "../../config/configService";
import { connectionsNumberMetric, getPostgresDbPoolSize } from "../../db/dbService";

promClient.collectDefaultMetrics();

export class PrometheusService {
    static async getMetricsJSON(): Promise<promClient.metric[]> {
        if (ConfigService.config.database) {
            connectionsNumberMetric
            .labels('opened')
            .observe(getPostgresDbPoolSize());
        }
        return promClient.register.getMetricsAsJSON();
    }

    static async getMetricsAsString() {
        if (ConfigService.config.database) {
            connectionsNumberMetric
            .labels('opened')
            .observe(getPostgresDbPoolSize());
        }
        return promClient.register.metrics();
    }
}