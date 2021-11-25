import Router from "express-promise-router";
import { default as axios } from 'axios';
import { ConfigService } from "../config/configService";
import { logger } from "../logger/logger";
import { Car } from "../dao/car.dao";
export const carsRouter = Router();

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

carsRouter.get('/', async (req, res): Car => {
    try {
    const subserviceData = ConfigService.config.subservice;
    const carsJsonRequest = await axios.get(`${subserviceData.URL}:${subserviceData.PORT}`);
    const carsJson = carsJsonRequest.data;
    const randomCar: Car = new Car(carsJson[getRandomInt(carsJson.length)])
    res.send(randomCar);
    } catch(e) {
        logger.error(e);
    }
});