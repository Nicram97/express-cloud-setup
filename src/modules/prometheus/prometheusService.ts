import * as promClient from "prom-client"

promClient.collectDefaultMetrics();

export class PrometheusService {
    static async getMetricsJSON(): Promise<promClient.metric[]> {
        return promClient.register.getMetricsAsJSON();
    }

    static async getMetricsAsString() {
        return promClient.register.metrics();
    }
}