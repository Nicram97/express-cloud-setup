import { Connection, createConnection } from "typeorm";

export let dbConnection: Connection;
export const initDb = async () => {
    dbConnection = await createConnection({
        type: "sqlite",
        database: "test.db.sqlite3",
        entities: [
            "./src/entity/**/*.ts"
        ],
        migrations: [
            "./src/migrations/**/*.ts"
        ],
        cli: {
            migrationsDir: "./src/migrations",
          },
        synchronize: false,
        logging: false,
        name: 'sqliteConnectionName'
    });
    return dbConnection;
}