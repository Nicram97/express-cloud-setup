export = {
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
    logging: false
}