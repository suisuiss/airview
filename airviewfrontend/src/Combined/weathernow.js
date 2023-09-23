import React from 'react';
import HeatIndex from '../emrontech/learningGarden/heatIndex';
import CurrentTemp from '../emrontech/learningGarden/temp';
import WeatherInfo from '../weather/currentInfo';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

function WeatherNow() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen

    // Define different styles for mobile and desktop
    const mobileStyles = {
        width: '60%', // Make the box full width on mobile
        padding: '10px', // Reduce padding on mobile
        fontSize: '12px', // Reduce font size on mobile
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center',
        borderRadius: '25px', // Center vertically
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
            {...(isMobile ? mobileStyles : desktopStyles)} // Apply styles conditionally
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
