import { Server } from "http";
import * as request from 'supertest';
import { main } from '../../src/main';
import { CARS_PROVIDER_OPTIONS, GET_CARS_LIST_INTERACTION } from "./carsContractUtils";
import { initPactProvider } from './pactUtils';

const carsProvider = initPactProvider(CARS_PROVIDER_OPTIONS);

describe('Pact with subservice', () => {
    let server: Server;
    beforeAll(async () => {
        server = await main();
        await carsProvider.setup();
        await carsProvider.addInteraction(GET_CARS_LIST_INTERACTION);
    });
    afterEach(async () => {
        await carsProvider.verify();
    });
    it('will receive a random car', async () => {
        const { body } = await request(server).get('/cars');
        expect(body).not.toBeUndefined();
    });
    afterAll(async () => {
        server.close();
        await carsProvider.finalize();
    });
});