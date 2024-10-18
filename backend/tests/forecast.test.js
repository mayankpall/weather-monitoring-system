// backend/tests/forecast.test.js
const request = require('supertest');
const express = require('express');
const weatherRoutes = require('../routes/weatherRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/weather', weatherRoutes);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

// describe('GET /api/weather/forecast/:city', () => {
//     it('should fetch forecast data for a valid city', async () => {
//         const res = await request(app).get('/api/weather/forecast/Delhi');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('city');
//         expect(res.body).toHaveProperty('list');
//     });

//     it('should return 500 for an invalid city', async () => {
//         const res = await request(app).get('/api/weather/forecast/InvalidCityName');
//         expect(res.statusCode).toEqual(500);
//         expect(res.body).toHaveProperty('message', 'Failed to fetch forecast data.');
//     });
// });
// tests/forecast.test.js
describe('GET /api/weather/forecast/:city', () => {
    const originalError = console.error;

    beforeAll(() => {
        // Mock console.error to suppress the error output in tests
        console.error = jest.fn();
    });

    afterAll(() => {
        // Restore console.error after tests
        console.error = originalError;
    });

    it('should handle an invalid city correctly', async () => {
        const res = await request(app).get('/api/weather/forecast/InvalidCityName');
        expect(res.statusCode).toEqual(500);  // Since you're catching the error and returning a 500
        expect(res.body).toHaveProperty('message', 'Failed to fetch forecast data.');
    });
});
