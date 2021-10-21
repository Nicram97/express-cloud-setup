import * as express from "express"
import * as actuator from "express-actuator"
import * as promClient from "prom-client"
import { globalExceptionsHandlerMiddleware } from "./modules/exceptions/globalExceptionsHandler";
import { userRouter } from "./routes/user"
import { initDependencies } from "./modules/init/init"
import { winstonLoggerMiddleware } from "./logger/logger";

async function main() {
    await initDependencies();
    const collectDefaultMetrics = promClient.collectDefaultMetrics;
    const Registry = promClient.Registry;
    const register = new Registry();
    collectDefaultMetrics({ register });
    
    const app = express();
    app.use(winstonLoggerMiddleware);
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