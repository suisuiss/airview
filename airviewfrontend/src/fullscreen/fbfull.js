import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import FBHumidityInfo from '../emrontech/fibo/humidity';
import CurrentAqiInfo from '../AQI/aqiInfo';
import WeatherForecastInfo from '../weather/weatherInfo';
import WeatherNow from '../Combined/weathernow';
import FBRainInfo from '../emrontech/fibo/rainfall';
import FBWBGTInfo from '../emrontech/fibo/wbgt';
import FBWindInfo from '../emrontech/fibo/windspeed';
import CurrentTime from '../currentDateTime/time';
import CurrentDate from '../currentDateTime/date';

function FBFull() {
  

    return (
       
            <Box
                marginTop="80px"
                display="flex"
                flexDirection="row"
                width="100%" // Ensure content takes full width
                height="100%" // Ensure content takes full height
                justifyContent="center"
                alignItems="center"
            >
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row">
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="start"
                            width="270px"
                        >
                            <Box
                                style={{
                                    height: '45px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h5" fontWeight="600" color="#363E64" paddingLeft="15px">Fibo</Typography>
                            </Box>
                            <Box
                                borderRadius="25px"
                                paddingTop="10px"
                                width="100%"
                            >
                                <Typography variant="h5" fontWeight="600" color="#363E64" paddingLeft="15px">KMUTT, Bangkok</Typography>
                                <Box mt={2}></Box>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-end" marginLeft="10px">
                            <Typography variant='h3' fontWeight="600" color="#363E64">
                                <CurrentTime />
                            </Typography>
                            <Typography variant='h5' color="#363E64">
                                <CurrentDate />
                            </Typography>
                        </Box>
                    </Box>
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
     
    );
}

export default FBFull;
