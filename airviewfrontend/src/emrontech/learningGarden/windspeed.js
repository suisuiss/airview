import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import windIcon from '../../assetIcon/wind.png';

function LGWindInfo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [windData, setWindData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        const delayBetweenRequests = 300000;

        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "1");
                setWindData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching Wind data:', error);
                setError(error);

                setTimeout(() => {
                    fetchData();
                }, delayBetweenRequests);
            });
    };

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, 300000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box
            height={isMobile ? '110px' : '165px'}
            width={isMobile ? '170px' : '260px'}
            bgcolor="#FFFF"
            borderRadius="25px"
            marginTop={isMobile ? '5px' : '10px'}
            marginLeft={isMobile ? '10px' : '20px'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={isMobile ? '10px' : '35px'} marginTop={isMobile ? '0px' : '10px'}>
                <Box display="flex" flexDirection="row" >
                    <Typography variant={isMobile ? 'body2' : 'h6'} fontWeight="500">                         Wind
                    </Typography>
                    <Box marginLeft={isMobile ? '20px' : '40px'}>
                        <img src={windIcon} alt="Image2" width={isMobile ? '12px' : '30px'} />
                    </Box>
                </Box>
                <Typography variant={isMobile ? 'body2' : '18px'} marginTop={isMobile ? '0px' : '10px'}>
                    {windData ? (
                        <div>
                            {windData.map(function (a) {
                                return <div key={a.id}>
                                    Speed: {a.data.wind_speed.value} m/s
                                </div>
                            })}
                            {windData.map(function (a) {
                                return <div key={a.id}>
                                    Direction: {a.data.wind_direction.value} degree
                                </div>
                            })}
                        </div>
                    ) : error ? (
                        <>Wind...</>
                    ) : (
                        <>Wind...</>
                    )}
                </Typography>
            </Box>
        </Box>
    );
}

export default LGWindInfo;