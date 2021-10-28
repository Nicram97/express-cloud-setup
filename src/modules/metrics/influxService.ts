import { PrometheusService } from "./prometheusService"
import * as promClient from "prom-client"
import {InfluxDB, Point, WriteApi} from '@influxdata/influxdb-client'

const influxToken = 'QkVtUb_mYxvP29F0l6DTt8jnJrchns88O_a1AXJSi72zPOcRpVwIySXmBOcCBqdo1utcT2feC34EsTMPgs4SHw==';
const org = 'test';
const bucketId = '9082a1478e9e781c';
const influxDB = new InfluxDB({url: 'http://localhost:8086',token: influxToken});

export let prometheusMetricsIntervalId;
export const sendPrometheusMetricsInterval = (time: number) => {
    prometheusMetricsIntervalId = setInterval(sendPrometheusMetricsToInflux, time);
}

export const deletePrometheusMetricsInterval = (intervalId: number) => {
    clearInterval(prometheusMetricsIntervalId);
}

export const sendPrometheusMetricsToInflux = async () => {
    const influxPoints: Point[] = parsePrometheusJsonToInflux(await PrometheusService.getMetricsJSON());
    const writeAPI: WriteApi = influxDB.getWriteApi(org, bucketId);
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