import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import rainIcon from '../../assetIcon/rainfall.png';
import LinearProgress from '@mui/material/LinearProgress';

function LGHumidityInfoTest() {
    const [rainData, setRainData] = useState(null);
    const [error, setError] = useState(null);
    const fetchDataWithRetry = () => {
        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "1");
                setRainData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching rain data:', error);
                setError(error);

                // Retry the request after a delay (e.g., 5 seconds)
                setTimeout(() => {
                    fetchDataWithRetry();
                }, 5000); // 5 seconds
            });
    };

    const rainWord = (rainValue) => {
        if (rainValue == 0) {
            return "No Rain";
        }
        else if (rainValue < 2.5) {
            return "Light";
        } else if (rainValue <= 7.5) {
            return "Moderate";
        } else if (rainValue <= 15) {
            return "Heavy";
        } else if (rainValue <= 30) {
            return "Intense";
        } else if (rainValue > 30) {
            return "Torrential";
        };
    }

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
    }, []);

    return (
        <Box width="220px" bgcolor="#FFFF" borderRadius="25px" marginTop='20px' marginLeft='20px' display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" paddingTop='10px' paddingLeft='20px' alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="center" marginBottom='15px'>
                    <Box display="flex" flexDirection="row" >
                        <Typography variant="h6" fontWeight="500">
                            Rain Fall
                        </Typography>
                        <Box marginLeft="80px">
                            <img src={rainIcon} alt="Image2" width='20px' />
                        </Box>
                    </Box>
                    <Typography variant="h5" marginTop="10px">
                        {rainData ? (<div>
                            {rainData.map(function (a) {
                                return <div key={a.id}>
                                    {a.data.rain_fall.value} mm
                                </div>
                            })}
                        </div>) : error ? (
                            <p>Rain...</p>
                        ) :
                            (
                                <p>Rain...</p>
                            )}
                    </Typography>
                    <Typography variant="h7" marginBottom="10px">
                        {rainData ? (
                            <div>
                                {rainWord(rainData[0].data.rain_fall.value)}
                            </div>
                        ) : (
                            <p>Rain...</p>
                        )}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

}



export default LGHumidityInfoTest;