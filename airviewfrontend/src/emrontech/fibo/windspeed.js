import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import windIcon from '../../assetIcon/wind.png';

function FBWindInfo() {
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
                const filteredData = data.filter((item) => item.id === "2");
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
            height="165px"
            width="260px"
            bgcolor="#FFFF"
            borderRadius="25px"
            marginTop='10px'
            marginLeft='20px'
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom='15px' marginTop='15px'>
                <Box display="flex" flexDirection="row" >
                    <Typography variant="h5" fontWeight="500">
                        Wind
                    </Typography>
                    <Box marginLeft="110px">
                        <img src={windIcon} alt="Image2" width='30px' />
                    </Box>
                </Box>
                <Typography fontSize="18px" marginTop="10px">
                    {windData ? (
                        <div>
                            {windData.map(function (a) {
                                return <div key={a.id}>
                                    Speed: {a.data.wind_speed.value} m/s
                                </div>
                            })}
                        </div>
                    ) : error ? (
                        <>Wind...</>
                    ) : (
                        <>Wind...</>
                    )}
                    {windData ? (
                        <div>

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

export default FBWindInfo;
