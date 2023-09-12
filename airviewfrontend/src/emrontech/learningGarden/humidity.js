import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import humidityIcon from '../../assetIcon/humidity.png';
import LinearProgress from '@mui/material/LinearProgress';

function LGHumidityInfo() {
    const [humidityData, setHumidityData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "1");
                setHumidityData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching Humidity data:', error);
                setError(error);
            });
    };

    const humidityWord = (humidityValue) => {
        if (humidityValue < 30) {
            return "Too Low";
        } else if (humidityValue <= 50) {
            return "Ideal";
        } else if (humidityValue > 50) {
            return "Too High";
        };
    }

    useEffect(() => {
        fetchData(); // Initial fetch
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
                <Box display="flex" flexDirection="row">
                    <Typography variant="h5" fontWeight="500">
                        Humidity
                    </Typography>
                    <Box marginLeft="80px">
                        <img src={humidityIcon} alt="Image2" width='15px' />
                    </Box>
                </Box>
                <Typography variant="h4" marginTop="10px">
                    {humidityData ? (
                        <div>
                            {humidityData.map(function (a) {
                                return <div key={a.id}>{a.data.humid.value}%</div>
                            })}
                        </div>
                    ) : error ? (
                        <>Humidity...</>
                    ) : (
                        <>Humidity...</>
                    )}
                </Typography>
                <Typography variant="h7" marginBottom="10px">
                    {humidityData ? (
                        <div>{humidityWord(humidityData[0].data.humid.value)}</div>
                    ) : (
                        <>Humidity...</>
                    )}
                </Typography>
                <LinearProgress
                    sx={{
                        width: '100%',
                        height: '10px',
                        borderRadius: '25px',
                        backgroundColor: '#ccc',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#90D02F',
                        },
                    }}
                    variant="determinate"
                    value={humidityData ? humidityData[0].data.humid.value : 0}
                />
            </Box>
        </Box>
    );
}

export default LGHumidityInfo;
