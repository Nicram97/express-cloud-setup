import Router from "express-promise-router";
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUI from 'swagger-ui-express';

export const swaggerRouter = Router();

const options: swaggerJSDoc.Options = {
    definition: {
        info: {
            title: 'Express cloud setup',
            version: '1.0.0',
        },
    },
    apis: ['src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

swaggerRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));