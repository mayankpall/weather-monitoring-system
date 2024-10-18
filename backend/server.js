// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const weatherRoutes = require('./routes/weatherRoutes');
const { startFetching } = require('./services/weatherService');
const { startAggregation } = require('./services/aggregationService');
const { startAlerting } = require('./services/alertService');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Connect to Database
connectDB();

// Start Services
startFetching();
startAggregation();
startAlerting();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
