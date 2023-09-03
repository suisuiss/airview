import React from 'react';
import LGDateTime from './LGDateTime';
import WeatherNow from './weathernow';
import WeatherForecastInfo from '../weather/weatherInfo';
import { Box } from '@mui/material';
import CurrentAqiInfo from '../AQI/aqiInfo';
import LGHumidityInfo from '../emrontech/learningGarden/humidity';
import LGRainInfo from '../emrontech/learningGarden/rainfall';
import LGWBGTInfo from '../emrontech/learningGarden/wbgt';
import LGWindInfo from '../emrontech/learningGarden/windspeed';

function Dashboard() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box marginTop="80px" display="flex" flexDirection="row">
                <Box display="flex" flexDirection="column">
                    <LGDateTime />
                    <WeatherNow />
                    <WeatherForecastInfo />
                </Box>
                <Box display="flex" flexDirection="column" marginLeft="100px">
                    <CurrentAqiInfo />
                    <Box display="flex" flexDirection="row" marginLeft="20px">
                        <LGHumidityInfo />
                        <LGRainInfo />
                    </Box>
                    <Box display="flex" flexDirection="row" marginLeft="20px">
                        <LGWBGTInfo />
                        <LGWindInfo />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Dashboard;
