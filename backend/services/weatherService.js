// backend/services/weatherService.js
const axios = require('axios');
const Weather = require('../models/Weather');
const cron = require('node-cron');
require('dotenv').config();

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const fetchWeatherData = async () => {
    try {
        for (const city of cities) {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
            );

            const data = response.data;
            const weather = new Weather({
                city: city,
                main: data.weather[0].main,
                temp: kelvinToCelsius(data.main.temp),
                feels_like: kelvinToCelsius(data.main.feels_like),
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                dt: data.dt
            });

            await weather.save();
            console.log(`Weather data saved for ${city} at ${new Date(data.dt * 1000)}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
};

const kelvinToCelsius = (tempK) => {
    return parseFloat((tempK - 273.15).toFixed(2));
};

const startFetching = () => {
    const interval = '*/5 * * * *'; // Every 5 minutes
    cron.schedule(interval, () => {
        console.log('Fetching weather data...');
        fetchWeatherData();
    });
    // Initial fetch
    fetchWeatherData();
};



module.exports = { startFetching, kelvinToCelsius,fetchWeatherData };
