import * as express from "express"
import * as actuator from "express-actuator"
import * as promClient from "prom-client"
import { initDb } from "./db/dbService";
import { globalExceptionsHandlerMiddleware } from "./modules/exceptions/globalExceptionsHandler";
import { userRouter } from "./routes/user"

async function main() {
    await initDb();
    const collectDefaultMetrics = promClient.collectDefaultMetrics;
    const Registry = promClient.Registry;
    const register = new Registry();
    collectDefaultMetrics({ register });
    const app = express();
    app.use(express.json());
    app.use('/users', userRouter);
    
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/prometheus-metrics', async (req, res) => {
        res.json(await register.metrics())
    });

    const actuatorOptions = {
        basePath: '/actuator',
        infoGitMode: 'simple',
        infoBuildOptions: null,
        infoDateFormat: null,
        customEndpoints: []
    };
    app.use(actuator(actuatorOptions));
    app.listen(3000);
    console.log('Listening on port 3000')
    app.use(globalExceptionsHandlerMiddleware);
}

main();