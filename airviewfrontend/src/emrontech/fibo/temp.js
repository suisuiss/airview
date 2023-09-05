import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function FBCurrentTemp() {
    const [tempData, setTempData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        const delayBetweenRequests = 300000; // 5 minutes in milliseconds

        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "1");
                setTempData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching Temp data:', error);
                setError(error);

                // Retry the request after a delay
                setTimeout(() => {
                    fetchData();
                }, delayBetweenRequests);
            });
    };

    useEffect(() => {
        fetchData(); // Initial fetch

        // Fetch data every 5 minutes (300,000 milliseconds)
        const intervalId = setInterval(fetchData, 300000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box>
            {tempData ? (<Box>
                {tempData.map(function (a) {
                    return <Box key={a.id} marginLeft='20px'>
                        <Typography variant='h2'>{a.data.temp.value}°C</Typography>
                    </Box>
                })}
            </Box>) : error ? (
                <p>Temp...</p>
            ) :
                (
                    <p>Temp...</p>
                )}
        </Box>
    );
}

export default FBCurrentTemp;
