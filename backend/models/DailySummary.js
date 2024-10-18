// backend/models/DailySummary.js
const mongoose = require('mongoose');

const DailySummarySchema = new mongoose.Schema({
    city: { type: String, required: true },
    date: { type: String, required: true }, // e.g., '2024-04-27'
    averageTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    dominantCondition: { type: String, required: true },
    averageHumidity: { type: Number, required: true },
    averageWindSpeed: { type: Number }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailySummary', DailySummarySchema);
