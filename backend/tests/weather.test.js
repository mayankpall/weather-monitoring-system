// backend/tests/weather.test.js
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

describe('Weather API Endpoints', () => {
    it('should retrieve latest weather data', async () => {
        const res = await request(app).get('/api/weather/latest');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should retrieve daily summaries', async () => {
        const res = await request(app).get('/api/weather/summaries');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should retrieve alerts', async () => {
        const res = await request(app).get('/api/weather/alerts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Add more tests as needed
});
