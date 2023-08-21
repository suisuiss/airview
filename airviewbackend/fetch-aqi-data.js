const cron = require('node-cron');
const axios = require('axios');

// Replace with your Express.js server URL
const serverUrl = 'http://localhost:4000';

cron.schedule('*/30 * * * *', async () => {
    try {
        await axios.get(`${serverUrl}/aqi/fetch`);
        console.log('AQI data fetched and saved.');
    } catch (error) {
        console.error('Error fetching AQI data:', error);
    }
});