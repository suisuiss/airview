import React from 'react';
import HeatIndex from '../emrontech/learningGarden/heatIndex';
import CurrentTemp from '../emrontech/learningGarden/temp';
import WeatherInfo from '../weather/currentInfo';
import { Box, Typography } from '@mui/material';

function WeatherNow() {
    return (
        <Box bgcolor='#6F9FFF' width='510px' borderRadius='25px' paddingLeft="30px" paddingTop='10px' paddingBottom='10px'>

            <Typography color='#FFFF'><Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" marginRight="170px">

                    <Typography variant='h5'>Now</Typography>
                    <CurrentTemp />
                    <Typography variant='h5'>
                        <HeatIndex />
                    </Typography>
                </Box>

                <WeatherInfo />

            </Box>
            </Typography>


        </Box>
    );

}

export default WeatherNow;
