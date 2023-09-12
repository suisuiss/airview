import React from 'react';
import { Box, Typography } from '@mui/material';
import CurrentTime from '../../currentDateTime/time';
import CurrentDate from '../../currentDateTime/date';
import WeatherForecastInfo from '../../weather/weatherInfo';
import WeatherNow from '../../Combined/weathernow';
import CurrentAqiInfo from '../../AQI/aqiInfo';
import LGHumidityInfo from '../../emrontech/learningGarden/humidity';
import LGRainInfo from '../../emrontech/learningGarden/rainfall';
import LGWBGTInfo from '../../emrontech/learningGarden/wbgt';
import LGWindInfo from '../../emrontech/learningGarden/windspeed';

function LGFullscreenContent() {
    const titleStyle = {
        height: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const leftColumnStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '270px',
    };

    const rightColumnStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginLeft: '10px',
    };

    return (
        <Box
            marginTop="0px"
            display="flex"
            flexDirection="row"
            width="100vw"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row">
                    <Box style={leftColumnStyle}>
                        <Box style={titleStyle}>
                            <Typography variant="h5" fontWeight="600" color="#363E64" paddingLeft="15px">Learning Garden</Typography>
                        </Box>
                        <Box borderRadius="25px" paddingTop="10px" width="100%">
                            <Typography variant="h5" fontWeight="600" color="#363E64" paddingLeft="15px">KMUTT, Bangkok</Typography>
                            <Box mt={2}></Box>
                        </Box>
                    </Box>
                    <Box style={rightColumnStyle}>
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
                    <LGHumidityInfo />
                    <LGRainInfo  />
                </Box>
                <Box display="flex" flexDirection="row" marginLeft="20px">
                    <LGWBGTInfo />
                    <LGWindInfo />
                </Box>
            </Box>
        </Box>
    );
}

export default LGFullscreenContent;
