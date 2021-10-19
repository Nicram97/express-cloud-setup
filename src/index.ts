import * as express from "express"
import { initDb } from "./db/dbService";
import { userRouter } from "./routes/user"

async function main() {
    await initDb();
    const app = express();
    app.use(express.json());
    app.use('/users', userRouter);
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(3000);
    console.log('Listening on port 3000')
    }

main();