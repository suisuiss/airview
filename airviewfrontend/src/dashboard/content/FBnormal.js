import React from 'react';
import { Box } from '@mui/material';
import FiboDateTime from '../../Combined/FiboDateTime';
import WeatherNow from '../../Combined/weathernow';
import WeatherForecastInfo from '../../weather/weatherInfo';
import CurrentAqiInfo from '../../AQI/aqiInfo';
import FBHumidityInfo from '../../emrontech/fibo/humidity';
import FBRainInfo from '../../emrontech/fibo/rainfall';
import FBWBGTInfo from '../../emrontech/fibo/wbgt';
import FBWindInfo from '../../emrontech/fibo/windspeed';

function NormalContent() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const contentContainerStyle = {
        marginTop: '80px',
        display: 'flex',
        flexDirection: 'row',
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const rightColumnStyle = {
        marginLeft: '100px',
    };

    return (
        <div style={containerStyle}>
            <Box style={contentContainerStyle}>
                <Box style={columnStyle}>
                    <FiboDateTime />
                    <WeatherNow />
                    <WeatherForecastInfo />
                </Box>
                <Box style={{ ...columnStyle, ...rightColumnStyle }}>
                    <CurrentAqiInfo />
                    <Box style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
                        <FBHumidityInfo />
                        <FBRainInfo />
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
                        <FBWBGTInfo />
                        <FBWindInfo />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default NormalContent;
