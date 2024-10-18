// backend/services/alertService.js
const Weather = require('../models/Weather');
const Alert = require('../models/Alert');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();

// Default thresholds
let thresholds = {
    temperature: {
        max: 35, // Celsius
        min: -5
    },
    conditions: ['Rain', 'Snow']
};

// Function to update thresholds (can be enhanced to fetch from user settings)
const updateThresholds = (newThresholds) => {
    if (newThresholds.temperature) {
        thresholds.temperature = { ...thresholds.temperature, ...newThresholds.temperature };
    }
    if (newThresholds.conditions) {
        thresholds.conditions = newThresholds.conditions;
    }
    console.log('Thresholds updated:', thresholds);
};

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const checkAlerts = async () => {
    try {
        const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

        for (const city of cities) {
            const latestWeather = await Weather.findOne({ city }).sort({ dt: -1 });

            if (!latestWeather) continue;

            // Check temperature thresholds
            if (latestWeather.temp > thresholds.temperature.max) {
                const existingAlerts = await Alert.find({
                    city,
                    condition: 'High Temperature',
                    acknowledged: false
                });

                // Trigger alert only if not already alerted
                if (existingAlerts.length === 0) {
                    const alert = new Alert({
                        city,
                        condition: 'High Temperature',
                        message: `Temperature in ${city} has exceeded ${thresholds.temperature.max}°C. Current temperature: ${latestWeather.temp}°C.`
                    });
                    await alert.save();
                    sendEmailAlert(alert);
                    console.log(`Alert triggered for high temperature in ${city}`);
                }
            }

            // Check weather condition thresholds
            if (thresholds.conditions.includes(latestWeather.main)) {
                const existingAlerts = await Alert.find({
                    city,
                    condition: `Weather Condition: ${latestWeather.main}`,
                    acknowledged: false
                });

                if (existingAlerts.length === 0) {
                    const alert = new Alert({
                        city,
                        condition: `Weather Condition: ${latestWeather.main}`,
                        message: `Weather condition in ${city} is ${latestWeather.main}.`
                    });
                    await alert.save();
                    sendEmailAlert(alert);
                    console.log(`Alert triggered for weather condition in ${city}`);
                }
            }
        }
    } catch (error) {
        console.error('Error checking alerts:', error.message);
    }
};

const sendEmailAlert = (alert) => {
    console.log('Attempting to send email alert...');
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to self; modify as needed
        subject: `Weather Alert: ${alert.condition} in ${alert.city}`,
        text: alert.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error.message);
        }
        console.log('Alert email sent:', info.response);
    });
};

const startAlerting = () => {
    // Schedule to run every 5 minutes
    const schedule = '*/5 * * * *';
    cron.schedule(schedule, () => {
        console.log('Checking for alerts...');
        checkAlerts();
    });
    // Initial check
    checkAlerts();
};

module.exports = { startAlerting, updateThresholds ,checkAlerts };
