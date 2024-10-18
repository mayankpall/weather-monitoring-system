// backend/services/aggregationService.js
const DailySummary = require('../models/DailySummary');
const Weather = require('../models/Weather');
const cron = require('node-cron');

// backend/services/aggregationService.js
const generateDailySummaries = async () => {
    try {
        const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
        const today = new Date();
        const dateString = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'

        for (const city of cities) {
            const startOfDay = new Date(dateString);
            const endOfDay = new Date(dateString);
            endOfDay.setDate(endOfDay.getDate() + 1);

            const weatherData = await Weather.find({
                city: city,
                createdAt: { $gte: startOfDay, $lt: endOfDay }
            });

            if (weatherData.length === 0) continue;

            const averageTemp = (
                weatherData.reduce((sum, record) => sum + record.temp, 0) / weatherData.length
            ).toFixed(2);

            const maxTemp = Math.max(...weatherData.map(record => record.temp));
            const minTemp = Math.min(...weatherData.map(record => record.temp));

            const averageHumidity = (
                weatherData.reduce((sum, record) => sum + record.humidity, 0) / weatherData.length
            ).toFixed(2);

            const averageWindSpeed = (
                weatherData.reduce((sum, record) => sum + record.wind_speed, 0) / weatherData.length
            ).toFixed(2);

            // Determine dominant weather condition
            const conditionFrequency = {};
            weatherData.forEach(record => {
                conditionFrequency[record.main] = (conditionFrequency[record.main] || 0) + 1;
            });
            const dominantCondition = Object.keys(conditionFrequency).reduce((a, b) =>
                conditionFrequency[a] > conditionFrequency[b] ? a : b
            );

            const summary = new DailySummary({
                city,
                date: dateString,
                averageTemp: parseFloat(averageTemp),
                maxTemp,
                minTemp,
                dominantCondition,
                averageHumidity: parseFloat(averageHumidity),
                averageWindSpeed: parseFloat(averageWindSpeed)
            });

            await summary.save();
            console.log(`Daily summary saved for ${city} on ${dateString}`);
        }
    } catch (error) {
        console.error('Error generating daily summaries:', error.message);
    }
};


const startAggregation = () => {
    // Schedule to run every day at 23:59
    const schedule = '59 23 * * *';
    cron.schedule(schedule, () => {
        console.log('Generating daily summaries...');
        generateDailySummaries();
    });
    // Optionally, run daily summaries for the current day if needed
    // generateDailySummaries();
};

// startAggregation();

module.exports = { startAggregation };
