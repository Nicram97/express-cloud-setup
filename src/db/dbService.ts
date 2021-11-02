import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ConfigService } from "../config/configService";

export let dbConnection: Connection;
export const initDb = async () => {
    dbConnection = await createConnection({
        type: "sqlite",
        database: ConfigService.config.sqlite.DB_DATABASE,
        entities: ConfigService.config.sqlite.DB_ENTITIES,
        migrations: ConfigService.config.sqlite.DB_MIGRATIONS,
        cli: {
            migrationsDir: ConfigService.config.sqlite.DB_CLI,
        },
        synchronize: false,
        logging: false,
        name: 'sqliteConnectionName'
    });
    return dbConnection;
}