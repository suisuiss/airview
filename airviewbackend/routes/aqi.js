const express = require('express');
const axios = require('axios');
const AqiData = require('../models/AqiData');

const router = express.Router();

router.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get(
            'http://api.airvisual.com/v2/nearest_city?lat=13.651502404577384&lon=100.49644279537901&key=c931c788-4515-48dc-8c74-1fd47b9817f7'
        );

        const aqiData = {
            timestamp: response.data.data.current.pollution.ts,
            aqi: response.data.data.current.pollution.aqius,
        };

        const newAqiData = new AqiData(aqiData);
        await newAqiData.save();

        res.status(200).json({ message: 'AQI data saved successfully' });
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
