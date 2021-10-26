import * as express from "express"
import { globalExceptionsHandlerMiddleware } from "./modules/exceptions/globalExceptionsHandler";
import { initDependencies } from "./modules/init/init"
import { logger, winstonLoggerMiddleware } from "./logger/logger";
import { mainRouter } from "./routes/main";
import { requestTimeMiddleware } from "./modules/metrics/requestTimeMiddleware";

async function main() {
    await initDependencies();
    
    const app = express();
    app.use(winstonLoggerMiddleware(logger));
    app.use(requestTimeMiddleware);
    app.use(express.json());
    app.use('/', mainRouter);
    
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    
    app.listen(3000);
    console.log('Listening on port 3000')
    app.use(globalExceptionsHandlerMiddleware);
}

main();