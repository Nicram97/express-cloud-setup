import { Pact, Verifier } from "@pact-foundation/pact";
import { eachLike, like } from "@pact-foundation/pact/src/dsl/matchers";
import { default as axios } from 'axios';
import { Server } from "http";
import * as path from 'path'
import { main } from '../../src/index'

const provider = new Pact({
    host: 'localhost',
    consumer: 'express-cloud-setup',
    provider: 'express-cloud-subservice',
    log: path.resolve(process.cwd(), "test", "contract", "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "test", "contract", "pacts"),
    port: 3001,
    logLevel: 'debug',
});

describe('Pact with subservice', () => {
    let server: Server;
    beforeAll(async () => {
        await provider.setup();

        // server = await main();
        const EXPECTED_BODY = eachLike({
            "Name": like("chevrolet chevelle malibu"),
            "Year":like("1970-01-01"),
            "Origin":like("USA")
         });

        await provider.addInteraction({
            state: 'provider contain list of cars',
            uponReceiving: 'a request for list of cars',
            withRequest: {
                path: '/',
                method: 'GET',
            },
            willRespondWith: {
                body: EXPECTED_BODY,
                status: 200,
            }
        })
    })
    afterAll(async () => {
        await provider.finalize()
    })
    it('will receive a list of cars', async () => {
        const result = await axios.get('http://localhost:3000/cars');
        expect(result).not.toBeUndefined();
    });

    it('should validate pact', () => {
        return new Verifier({
            provider: 'express-cloud-subservice',
            providerBaseUrl: 'http://localhost:3002',
            pactUrls: [path.resolve(process.cwd(), "test", "contract", "pacts", "express-cloud-setup-express-cloud-subservice.json")],
        }).verifyProvider()
    });
});