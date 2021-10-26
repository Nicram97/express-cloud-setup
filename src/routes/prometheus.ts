import Router from "express-promise-router";
import { PrometheusService } from "../modules/prometheus/prometheusService";

export const prometheusRouter = Router();

prometheusRouter.get('/metricsAsJson', async (req, res) => {
    res.json(PrometheusService.getMetricsJSON());
});

prometheusRouter.get('/metricsAsString', async (req, res) => {
    res.json(PrometheusService.getMetricsAsString());
});