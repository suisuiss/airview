import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import WeatherNow from '../../Combined/weathernow';
import WeatherForecastInfo from '../../weather/weatherInfo';
import CurrentAqiInfo from '../../AQI/aqiInfo';
import LGDateTime from '../../Combined/LGDateTime';
import LGHumidityInfo from '../../emrontech/learningGarden/humidity';
import LGRainInfo from '../../emrontech/learningGarden/rainfall';
import LGWBGTInfo from '../../emrontech/learningGarden/wbgt';
import LGWindInfo from '../../emrontech/learningGarden/windspeed';
import FiboDateTime from './FBDateTime';
import LGLocation from './LGlocation';

function LGNormalContent() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    };

    const contentContainerStyle = {
        marginTop: '10px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',

    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
                };

    const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: isMobile ? '10px' : '0px',

    };

    const rightColumnStyle = {
        marginLeft: isMobile ? '0' : '100px',
    };

    return (
        <div style={containerStyle}>
            <Box style={contentContainerStyle}>
                <Box style={columnStyle}>
                    {isMobile ? (
                        <>
                            <LGLocation />
                            <FiboDateTime />
                        </>
                    ) : (
                        <LGDateTime />
                    )}
                    <WeatherNow />
                    <WeatherForecastInfo />
                </Box>
                <Box style={{ ...columnStyle, ...rightColumnStyle }}>
                    <CurrentAqiInfo />
                    <Box style={rowStyle}>
                        <LGHumidityInfo />
                        <LGRainInfo />
                    </Box>
                    <Box style={rowStyle} >
                        <LGWBGTInfo />
                        <LGWindInfo />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default LGNormalContent;
