import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import humidityIcon from '../../assetIcon/humidity.png';
import LinearProgress from '@mui/material/LinearProgress';

function LGHumidityInfoTest() {
    const [humidityData, setHumidityData] = useState(null);
    const [error, setError] = useState(null);
    const fetchDataWithRetry = () => {
        fetch('https://e5f1-119-76-183-133.ngrok-free.app/test', {
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        })
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

                // Retry the request after a delay (e.g., 5 seconds)
                setTimeout(() => {
                    fetchDataWithRetry();
                }, 5000); // 5 seconds
            });
    };

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
    }, []);

    return (
        <Box width="220px" bgcolor="#FFFF" borderRadius="25px" marginTop='20px' marginLeft='20px' display="flex" flexDirection="column">
            {/* {humidityData ? (<div>
                {humidityData.map(function (a) {
                    return <div key={a.id}>
                        Humidity: {a.data.humid.value}%
                    </div>
                })}
            </div>) : error ? (
                <p>Loading Humidity data...</p>
            ) :
                (
                    <p>Loading Humidity data...</p>
                )} */}
            <Box display="flex" flexDirection="row" paddingTop='10px' paddingLeft='20px'  alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="center" marginBottom='15px'>
                    <Box display="flex" flexDirection="row" >
                        <Typography variant="h6" fontWeight="500">
                            Humidity
                        </Typography>
                        <Box marginLeft="80px">
                            <img src={humidityIcon} alt="Image2" width='15px' />
                        </Box>
                    </Box>
                    <Typography variant="h5" marginTop="10px">
                        80%
                    </Typography>
                    <Typography variant="h7" marginBottom="10px">
                        Good
                    </Typography>
                    <LinearProgress sx={{
                        width: '100%',
                        height: '10px',
                        borderRadius: '25px', // Adjust the height of the progress bar
                        backgroundColor: '#ccc', // Set the background color
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#90D02F', // Set the progress bar color (green)
                        },
                    }} variant="determinate" value={80} />
                </Box>
            </Box>
        </Box>
    );

}



export default LGHumidityInfoTest;