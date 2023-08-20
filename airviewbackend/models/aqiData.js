const mongoose = require('mongoose');

const aqiDataSchema = new mongoose.Schema({
    timestamp: String,
    aqi: Number
    
});

module.exports = mongoose.model('AqiData', aqiDataSchema);
