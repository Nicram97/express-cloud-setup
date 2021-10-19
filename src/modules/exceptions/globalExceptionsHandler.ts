import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import HttpException from './httpException';


export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || error.status || 500;
    response.status(status);
    response.json(error);
}
export const globalExceptionsHandlerMiddleware: ErrorRequestHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    errorHandler(error, request, response, next);
}