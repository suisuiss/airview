const mongoose = require('mongoose');

const aqiDataSchema = new mongoose.Schema({
    aqi: Number,
    current_time: {
        type: Date,
        default: Date.now,
    }
}
);

module.exports = mongoose.model('AqiData', aqiDataSchema);