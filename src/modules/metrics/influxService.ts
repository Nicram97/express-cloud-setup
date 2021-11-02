import { PrometheusService } from "./prometheusService"
import * as promClient from "prom-client"
import {InfluxDB, Point, WriteApi} from '@influxdata/influxdb-client'
import { ConfigService } from "../../config/configService";

export let influxDB: InfluxDB
export let prometheusMetricsIntervalId;

export const initInfluxConnection = (): void => {
    if (ConfigService.config.influxClient) {
        influxDB = new InfluxDB({
            url: ConfigService.config.influxClient.INFLUX_URL,
            token: ConfigService.config.influxClient.INFLUX_ACCESS_TOKEN
            });
        sendPrometheusMetricsInterval(ConfigService.config.influxClient.INFLUX_SEND_INTERVAL_MS)
    }
}
export const sendPrometheusMetricsInterval = (time: number) => {
    prometheusMetricsIntervalId = setInterval(sendPrometheusMetricsToInflux, time);
}

export const deletePrometheusMetricsInterval = (intervalId: number) => {
    clearInterval(intervalId);
}

const sendPrometheusMetricsToInflux = async () => {
    const influxPoints: Point[] = parsePrometheusJsonToInflux(await PrometheusService.getMetricsJSON());
    const writeAPI: WriteApi = influxDB.getWriteApi(
        ConfigService.config.influxClient.INFLUX_ORGANIZATION,
        ConfigService.config.influxClient.INFLUX_BUCKET_ID
        );
    writeAPI.writePoints(influxPoints);
    await writeAPI.close();
}

const parsePrometheusJsonToInflux = (prometheusData: promClient.metric[]): Point[] => {
    let influxPoints: Point[] = [];
    prometheusData.forEach(metric => {
        const point: Point = new Point(metric.name)
        .tag('aggregator', metric.aggregator)
        .tag('description', metric.help)
        .tag('type', metric.type.toString());

        if((metric as any).values.length > 0) {
            ((metric as any).values as Array<any>).forEach( element => {
                const label = (element.labels[Object.keys(element.labels).find((key) => key === 'space')] as string) || metric.name;
                const value = element.value;
                if (isNaN(value)) {
                    point.stringField(label, value.toString());
                }
                if (label === 'nodejs_version_info') {
                    point.stringField(label, element.labels.version.toString());
                  } else {
                    point.floatField(label, value);
                  }
            });
        } else {
            point.floatField('value', 0);
        }
        influxPoints.push(point);
    });
    return influxPoints;
}