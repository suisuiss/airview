import React from 'react';
import { Box } from '@mui/material';
import WeatherNow from '../../Combined/weathernow';
import WeatherForecastInfo from '../../weather/weatherInfo';
import CurrentAqiInfo from '../../AQI/aqiInfo';
import LGDateTime from '../../Combined/LGDateTime';
import LGHumidityInfo from '../../emrontech/learningGarden/humidity';
import LGRainInfo from '../../emrontech/learningGarden/rainfall';
import LGWBGTInfo from '../../emrontech/learningGarden/wbgt';
import LGWindInfo from '../../emrontech/learningGarden/windspeed';

function LGNormalContent() {
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
                    <LGDateTime />
                    <WeatherNow />
                    <WeatherForecastInfo />
                </Box>
                <Box style={{ ...columnStyle, ...rightColumnStyle }}>
                    <CurrentAqiInfo />
                    <Box style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
                        <LGHumidityInfo />
                        <LGRainInfo />
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
                        <LGWBGTInfo />
                        <LGWindInfo />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default LGNormalContent;
