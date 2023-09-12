import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import rainIcon from '../../assetIcon/rainfall.png';

function FBRainInfo() {
    const [rainData, setRainData] = useState(null);
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
                setRainData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching rain data:', error);
                setError(error);

                setTimeout(() => {
                    fetchData();
                }, delayBetweenRequests);
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
                        Rain Fall
                    </Typography>
                    <Box marginLeft="80px">
                        <img src={rainIcon} alt="Image2" width='20px' />
                    </Box>
                </Box>
                <Typography variant="h4" marginTop="10px">
                    {rainData ? (
                        <div>
                            {rainData.map(function (a) {
                                return <div key={a.id}>{a.data.rain_fall.value} mm</div>
                            })}
                        </div>
                    ) : error ? (
                        <>Rain...</>
                    ) : (
                        <>Rain...</>
                    )}
                </Typography>
                <Typography variant="h7" marginBottom="10px">
                    {rainData ? (
                        <div>{rainWord(rainData[0].data.rain_fall.value)}</div>
                    ) : (
                        <>Rain...</>
                    )}
                </Typography>
            </Box>
        </Box>
    );
}

export default FBRainInfo;
