import { Request, Response, NextFunction } from 'express';
import { logger } from '../../logger/logger';
import * as promClient from "prom-client"

const timeMetric = new promClient.Summary({
    name: 'response_times',
    help: 'Response time in milliseconds',
    labelNames: ['method', 'url', 'status'],
    aggregator: 'average',
  });

const getDurationInMilliseconds = (start: [number, number]) => {
    const NS_PER_SEC: number = 1e9;
    const NS_TO_MS: number = 1e6;
    const diff: [number, number] = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}
export const requestTimeMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info(`${request.method} ${request.originalUrl} [STARTED]`);
    const start: [number, number] = process.hrtime();

    response.on('finish', () => {            
        const durationInMilliseconds = getDurationInMilliseconds (start);
        logger.info(`${request.method} ${request.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
    });

    response.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds (start);
        logger.info(`${request.method} ${request.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`);
        timeMetric
            .labels(request.method, request.originalUrl, response.statusCode.toString())
            .observe(durationInMilliseconds)
    });

    next();
}