import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import windIcon from '../../assetIcon/wind.png';
function LGWindInfo() {
    const [windData, setWindData] = useState(null);
    const [error, setError] = useState(null);
    const fetchDataWithRetry = () => {
        const delayBetweenRequests = 5000; // 5 seconds

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

                // Retry the request after a delay
                setTimeout(() => {
                    fetchDataWithRetry();
                }, delayBetweenRequests);
            });
    };

    

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
    }, []);

    return (
        <Box width="220px" bgcolor="#FFFF" borderRadius="25px" marginTop='20px' marginLeft='20px' display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" paddingTop='10px' paddingLeft='20px' alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="center" marginBottom='15px'>
                    <Box display="flex" flexDirection="row" >
                        <Typography variant="h6" fontWeight="500">
                            Wind
                        </Typography>
                        <Box marginLeft="110px">
                            <img src={windIcon} alt="Image2" width='20px' />
                        </Box>
                    </Box>
                    <Typography fontSize="15px" marginTop="10px">
                        {windData ? (<div>
                            {windData.map(function (a) {
                                return <div key={a.id}>
                                Speed: {a.data.wind_speed.value} m/s
                                </div>
                            })}
                        </div>) : error ? (
                            <p>Wind...</p>
                        ) :
                            (
                                <p>Wind...</p>
                            )}
                        {windData ? (<div>
                            {windData.map(function (a) {
                                return <div key={a.id}>
                                    Direction: {a.data.wind_direction.value} degree
                                </div>
                            })}
                        </div>) : error ? (
                            <p>Wind...</p>
                        ) :
                            (
                                <p>Wind...</p>
                            )}
                    </Typography>
                    
                </Box>
            </Box>
        </Box>
    );

}



export default LGWindInfo;