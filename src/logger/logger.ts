import * as winston from "winston"
import * as expressWinston from "express-winston"
import * as logform from "logform"
import { LogstashTransport } from "winston-logstash-ts"
import { ConfigService } from "../config/configService";

export let logger:ReturnType<typeof winston.createLogger>;
export const initWinstonLogger = async () => {
  if (ConfigService.config.logstash) {
    logger = winston.createLogger({
        transports: [
          new winston.transports.Console(),
          new LogstashTransport({
            host: ConfigService.config.logstash.LOGSTASH_HOST,
            port: ConfigService.config.logstash.LOGSTASH_PORT,
            protocol: ConfigService.config.logstash.LOGSTASH_PROTOCOL,
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
  } else {
    logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    });
  }
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