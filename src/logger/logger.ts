import * as winston from "winston"
import * as expressWinston from "express-winston"
import * as logform from "logform"
import { LogstashTransport } from "winston-logstash-ts"

export let logger:ReturnType<typeof winston.createLogger>;
export const initWinstonLogger = async () => {
    logger = winston.createLogger({
        transports: [
          new winston.transports.Console({handleExceptions: true}),
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
        levels: {error : 0},
        silent: false,
        handleExceptions: true,
        level: "error",
        exceptionHandlers: (obj) => {
          console.log(obj)
        },
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        )
    });
    return logger;
};

export const winstonLoggerMiddleware = 
    expressWinston.logger({
        transports: [
          new winston.transports.Console(),
        ],
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        )
    });
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');