import { default as axios } from 'axios';
import { Car } from '../../src/dao/car.dao';

describe('/cars (GET)', () => {
    it('should return random Car object', async () => {
        const { data } = await axios.get<Car>('http://localhost:3000/cars');
        const carsJson = data;
        expect(carsJson.acceleration).toBeDefined();
        expect(typeof carsJson.acceleration).toBe('number');
    });
});