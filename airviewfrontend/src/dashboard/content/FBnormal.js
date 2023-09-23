import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import FiboDateTime from './FBDateTime';
import FBHumidityInfo from '../../emrontech/fibo/humidity';
import FBRainInfo from '../../emrontech/fibo/rainfall';
import FBWBGTInfo from '../../emrontech/fibo/wbgt';
import FBWindInfo from '../../emrontech/fibo/windspeed';
import WeatherForecastInfo from '../../weather/weatherInfo';
import WeatherNow from '../../Combined/weathernow';
import FiboLocation from './FiboLocation';
import CurrentAqiInfo from '../../AQI/aqiInfo';
import FBDateTime from '../../Combined/FiboDateTime';

function NormalContent() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const contentContainerStyle = {
        marginTop: '80px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // Use column layout for mobile, row for desktop
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align for mobile
    };

    const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
    };

    const rightColumnStyle = {
        marginLeft: isMobile ? '0' : '100px', // No margin for mobile, margin for desktop
    };

    return (
        <div style={containerStyle}>
            <Box style={contentContainerStyle}>
                <Box style={columnStyle}>
                    {isMobile ? (
                        <>
                            <FiboLocation /> {/* Show FiboLocation on mobile */}
                            <FiboDateTime /> {/* Show FiboDateTime on mobile */}
                        </>
                    ) : (
                        <FBDateTime /> 
                    )}
                    <WeatherNow />
                    {!isMobile && <WeatherForecastInfo />} {/* Only show WeatherForecastInfo on desktop */}
                </Box>
                <Box style={{ ...columnStyle, ...rightColumnStyle }}>
                    <CurrentAqiInfo />
                    <Box style={rowStyle}>
                        <FBHumidityInfo />
                        <FBRainInfo />
                    </Box>
                    <Box style={rowStyle}>
                        <FBWBGTInfo />
                        <FBWindInfo />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default NormalContent;
