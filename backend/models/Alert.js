// backend/models/Alert.js
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    city: { type: String, required: true },
    condition: { type: String, required: true },
    message: { type: String, required: true },
    triggeredAt: { type: Date, default: Date.now },
    acknowledged: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', AlertSchema);
