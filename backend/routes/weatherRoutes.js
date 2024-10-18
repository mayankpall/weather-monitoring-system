// backend/routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');
const DailySummary = require('../models/DailySummary');
const Alert = require('../models/Alert');
const axios = require('axios');

// Get latest weather data for all cities
router.get('/latest', async (req, res) => {
    try {
        const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
        const latestData = await Promise.all(
            cities.map(async (city) => {
                const data = await Weather.findOne({ city }).sort({ dt: -1 });
                return data;
            })
        );
        res.json(latestData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get daily summaries
router.get('/summaries', async (req, res) => {
    try {
        const summaries = await DailySummary.find().sort({ date: -1 });
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get alerts
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ triggeredAt: -1 });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update thresholds (for bonus: make thresholds configurable via API)
router.post('/thresholds', async (req, res) => {
    try {
        const { temperature, conditions } = req.body;
        updateThresholds({ temperature, conditions });
        res.json({ message: 'Thresholds updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/forecast/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        const forecastData = response.data;
        res.json(forecastData);
    } catch (error) {
        console.error(`Error fetching forecast for ${req.params.city}:`, error.message);
        res.status(500).json({ message: 'Failed to fetch forecast data.' });
    }
});

module.exports = router;