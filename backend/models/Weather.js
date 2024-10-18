// backend/models/Weather.js
const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    city: { type: String, required: true },
    main: { type: String, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    humidity: { type: Number, required: true },
    wind_speed: { type: Number, required: true },
    dt: { type: Number, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', WeatherSchema);
