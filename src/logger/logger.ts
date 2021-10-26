import * as winston from "winston"
import * as expressWinston from "express-winston"
import * as logform from "logform"
import { LogstashTransport } from "winston-logstash-ts"

export let logger:ReturnType<typeof winston.createLogger>;
export const initWinstonLogger = async () => {
    logger = winston.createLogger({
        transports: [
          new winston.transports.Console(),
          new LogstashTransport({
            host: "localhost",
            port: 5000,
            protocol: "tcp",
            format: logform.format.combine(
                logform.format.timestamp(),
                logform.format.logstash(),
            )
        })
        ],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        )
    });
    return logger;
};

export const winstonLoggerMiddleware = (winstonLoggerInstance: winston.Logger) => {
    const result =  expressWinston.logger({
        winstonInstance: winstonLoggerInstance,
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
    });
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  return result;
}