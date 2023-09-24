import React from 'react';
import HeatIndex from '../emrontech/learningGarden/heatIndex';
import CurrentTemp from '../emrontech/learningGarden/temp';
import WeatherInfo from '../weather/currentInfo';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

function WeatherNow() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const mobileStyles = {
        width: '350px', 
        paddingTop: '20px',
        paddingBottom: '20px', 
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '25px',
        marginBottom: '10px'

    };

    const desktopStyles = {
        width: '510px',
        borderRadius: '25px',
        paddingLeft: '30px',
        paddingTop: '10px',
        paddingBottom: '10px',
    };

    return (
        <Box
            bgcolor='#6F9FFF'
            {...(isMobile ? mobileStyles : desktopStyles)} 
        >
            <Typography color='#FFFF'>
                <Box display="flex" flexDirection="row">
                    <Box display="flex" flexDirection="column" marginRight={isMobile ? '10px' : '170px'}>
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
