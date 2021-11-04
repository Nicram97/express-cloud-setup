import { ConfigService } from "./src/config/configService"

const config = ConfigService.loadConfigFile();

const dbConfig = () => {
    if (config.sqlite) {
        return {
            type: "sqlite",
            database: config.sqlite.DB_DATABASE,
            entities: config.sqlite.DB_ENTITIES,
            migrations: config.sqlite.DB_MIGRATIONS,
            cli: {
                migrationsDir: config.sqlite.DB_CLI,
            },
            synchronize: false,
            logging: false
        };
    } else {
        return {
            type: 'postgres',
            host: 'localhost',
            port: config.DB_PORT,
            username: config.database.DB_USERNAME,
            password: config.database.DB_PASSWORD,
            database: config.database.DB_DATABASE,
            entities: config.database.DB_ENTITIES,
            migrations: config.database.DB_MIGRATIONS,
            cli: {
                migrationsDir: config.database.DB_CLI,
            },
          }
    }
}

export default dbConfig();