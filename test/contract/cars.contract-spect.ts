import { Pact } from "@pact-foundation/pact";
import { eachLike } from "@pact-foundation/pact/src/dsl/matchers";


describe('Pact with subservice', () => {
    const provider = new Pact({
        consumer: 'express-cloud-setup',
        provider: 'express-cloud-subservice',
        port: 1234,
    });

    const EXPECTED_BODY = eachLike({
        "Name":"chevrolet chevelle malibu",
        "Miles_per_Gallon":18,
        "Cylinders":8,
        "Displacement":307,
        "Horsepower":130,
        "Weight_in_lbs":3504,
        "Acceleration":12,
        "Year":"1970-01-01",
        "Origin":"USA"
     });

     it('should get list of cars', () => {
        
     });
});