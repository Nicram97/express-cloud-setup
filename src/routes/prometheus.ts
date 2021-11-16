import Router from "express-promise-router";
import { PrometheusService } from "../modules/metrics/prometheusService";

export const prometheusRouter = Router();

prometheusRouter.get('/metricsAsJson', async (req, res) => {
    res.json(await PrometheusService.getMetricsJSON());
});

prometheusRouter.get('/metricsAsString', async (req, res) => {
    res.send(await PrometheusService.getMetricsAsString());
});