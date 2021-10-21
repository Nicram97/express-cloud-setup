import * as winston from "winston"
import * as expressWinston from "express-winston"

export let logger;
export const initWinstonLogger = async () => {
    logger = winston.createLogger({
        transports: [
          new winston.transports.Console()
        ],
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
          new winston.transports.Console()
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