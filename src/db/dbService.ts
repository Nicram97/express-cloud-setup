import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ConfigService } from "../config/configService";
import * as promClient from "prom-client"

export const connectionsNumberMetric = new promClient.Summary({
    name: 'opened_connections',
    help: 'Number of opened connections in database',
    labelNames: ['opened'],
    aggregator: 'omit',
  });

export let dbConnection: Connection;
export const initDb = async () => {
    let connectionOptions: ConnectionOptions;
    if (ConfigService.config.sqlite) {
        connectionOptions = {
            type: 'sqlite',
            database: ConfigService.config.sqlite.DB_DATABASE,
            entities: ConfigService.config.sqlite.DB_ENTITIES,
            migrations: ConfigService.config.sqlite.DB_MIGRATIONS,
            cli: {
                migrationsDir: ConfigService.config.sqlite.DB_CLI,
            },
            synchronize: false,
            logging: false,
            name: 'sqliteConnectionName'
        };
    } else if (ConfigService.config.database) {
        connectionOptions = {
            type: 'postgres',
            host: ConfigService.config.database.DB_HOST,
            port: ConfigService.config.database.DB_PORT,
            username: ConfigService.config.database.DB_USERNAME,
            password: ConfigService.config.database.DB_PASSWORD,
            database: ConfigService.config.database.DB_DATABASE,
            entities: ConfigService.config.database.DB_ENTITIES,
            migrations: ConfigService.config.database.DB_MIGRATIONS,
            cli: {
                migrationsDir: ConfigService.config.database.DB_CLI,
            }
          }
    } else {
        throw new Error('Can\'t establish db connection, please check config.yaml file');
    }
    dbConnection = await createConnection(connectionOptions);
    return dbConnection;
}

export const getPostgresDbPoolSize = (): number => {
    return (dbConnection.driver as any).postgres.Pool.length;
}