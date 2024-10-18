const { checkAlerts, updateThresholds } = require('../services/alertService');
const Weather = require('../models/Weather');
const Alert = require('../models/Alert');
const mongoose = require('mongoose');

describe('Alerting Service Tests', () => {
    beforeAll(async () => {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weatherTestDB');

        // Set alert thresholds for the test
        updateThresholds({ temperature: { max: 35 }, conditions: ['Rain', 'Snow'] });

        // Insert mock weather data for Mumbai
        await Weather.create({
            city: 'Mumbai',
            temp: 36, // Temperature exceeds the threshold
            main: 'Clear',
            wind_speed: 5,
            humidity: 60,
            feels_like: 35,
            dt: Date.now(),
        });
    });

    afterAll(async () => {
        // Cleanup the database and close the MongoDB connection after the tests
        await Weather.deleteMany({});
        await Alert.deleteMany({});
        await mongoose.connection.close();
    });

    test('should trigger a high temperature alert for Mumbai', async () => {
        // Run the alert checking function
        await checkAlerts();

        // Check if an alert for high temperature in Mumbai has been created
        const alert = await Alert.findOne({ city: 'Mumbai', condition: 'High Temperature' });
        expect(alert).toBeTruthy();  // Ensure the alert exists
        expect(alert.message).toContain('exceeded 35°C');  // Verify the alert message
    });
});
