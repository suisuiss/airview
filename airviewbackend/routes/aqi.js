const express = require('express');
const axios = require('axios');
const AqiData = require('../models/AqiData');

const router = express.Router();

const maxRetries = 3; // Maximum number of retries
const retryDelay = 5000; // 5 seconds

const fetchAndStoreAQI = async (retryCount = 0) => {
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

        console.log('AQI data saved successfully');
        return true;
    } catch (error) {
        console.error('Error fetching AQI data:', error);

        if (retryCount < maxRetries) {
            // Retry after delay
            retryCount++;
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            setTimeout(() => {
                fetchAndStoreAQI(retryCount);
            }, retryDelay);
        } else {
            console.error('Max retries reached. Unable to fetch AQI data.');
            return false;
        }
    }
};

router.get('/fetch', async (req, res) => {
    const success = await fetchAndStoreAQI();
    if (success) {
        res.status(200).json({ message: 'AQI data saved successfully' });
    } else {
        res.status(500).json({ error: 'Unable to fetch AQI data' });
    }
});

module.exports = router;
