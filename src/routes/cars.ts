import Router from "express-promise-router";
import { default as axios } from 'axios';
import { ConfigService } from "../config/configService";
export const carsRouter = Router();

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

carsRouter.get('/', async (req, res) => {
    try {
    const subserviceData = ConfigService.config.subservice;
    const carsJsonRequest = await axios.get(`${subserviceData.URL}:${subserviceData.PORT}`);
    const carsJson = carsJsonRequest.data;
    const randomCar = carsJson[getRandomInt(carsJson.length)]
    res.json(randomCar);
    } catch(e) {
        console.error(e);
    }
});