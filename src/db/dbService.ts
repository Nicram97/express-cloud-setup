import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ConfigService } from "../config/configService";

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
            host: 'localhost',
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