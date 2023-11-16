import React, { useState, useEffect } from 'react';
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
    const [backgroundColor, setBackgroundColor] = useState(getBackgroundColor());

    useEffect(() => {
        const intervalId = setInterval(() => {
        setBackgroundColor(getBackgroundColor());
        }, 100); // Update every minute

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    function getBackgroundColor() {
        const currentHour = new Date().getHours();

        if (currentHour >= 6 && currentHour < 16) {
        // Day
        return `#6F9FFF`; // Yellow
        } else if (currentHour >= 16 && currentHour < 19) {
        // Evening
        return `rgba(217, 122, 35, 1)`; // Sky Blue
        } else {
        // Night (Gradient)
        return `rgba(32, 80, 151, 1)`;
        }
    }

    return (
        <Box
            bgcolor={backgroundColor}
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
