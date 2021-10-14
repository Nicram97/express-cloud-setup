import * as express from "express"
import * as fse from "fs-extra";
import { createConnection, getConnection } from "typeorm";
import { User } from "./entity/user";

async function main() {
    const app = express();
    app.use(express.json());
    const dpConnection = await createConnection({
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

    const userRepository = dpConnection.getRepository(User);

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/users', async (req, res) => {
        try {
        const users = await fse.readJSON(`${__dirname}/users.json`);
        res.send(users);
        } catch(e) {
            console.log(e.message);
            throw e;
        }
    });

    app.get('/users/:id', async (req, res) => {
        try {
        const users = await fse.readJSON(`${__dirname}/users.json`);
        const user = users.find(el => el.userId === parseInt(req.params.id))
        res.send(user);
        } catch(e) {
            console.log(e.message);
            throw e;
        }
    });

    app.post('/users', async (req, res) => {
        await addUser(req.body);
        res.send('User created');

    });

    const addUser = async (body: {userName: string, description: string}) => {
        try {
            let user = userRepository.create({
                userName: body.userName,
                description: body.description
            });
            await userRepository.save(user);
        } catch(e) {
        console.log(e.message);
        throw e;
        }
    };

    app.listen(3000);
    console.log('Listening on port 3000')
    }

main();