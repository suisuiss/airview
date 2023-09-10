import React from 'react';
import { Box } from '@mui/material';
import FBHumidityInfo from '../emrontech/fibo/humidity';
import CurrentAqiInfo from '../AQI/aqiInfo';
import WeatherForecastInfo from '../weather/weatherInfo';
import WeatherNow from '../Combined/weathernow';
import FBRainInfo from '../emrontech/fibo/rainfall';
import FBWBGTInfo from '../emrontech/fibo/wbgt';
import FBWindInfo from '../emrontech/fibo/windspeed';
import FiboDateTime from '../Combined/FiboDateTime';




function FBDashboard() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box marginTop="80px" display="flex" flexDirection="row">
                <Box display="flex" flexDirection="column">
                    <FiboDateTime />
                    <WeatherNow />
                    <WeatherForecastInfo />
                </Box>
                <Box display="flex" flexDirection="column" marginLeft="100px">
                    <CurrentAqiInfo />
                    <Box display="flex" flexDirection="row" marginLeft="20px">
                        <FBHumidityInfo />
                        <FBRainInfo />
                    </Box>
                    <Box display="flex" flexDirection="row" marginLeft="20px">
                        <FBWBGTInfo />
                        <FBWindInfo />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default FBDashboard;
