const express = require('express');
const axios = require('axios');
const AqiData = require('../models/AqiData');

const router = express.Router();

const maxRetries = 3; // Maximum number of retries
const retryDelay = 5000; // 5 seconds

const fetchAndStoreAQI = async (retryCount = 0) => {
    try {
        const response = await axios.get(
            'https://api.waqi.info/feed/bangkok/?token=93251e1c93612cabd3b0bd3214148bb64039c4ec'
        );

        const aqiData = {
            aqi: response.data.data.aqi,
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
