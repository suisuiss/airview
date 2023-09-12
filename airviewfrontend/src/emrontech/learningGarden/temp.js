import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function LGCurrentTemp() {
    const [tempData, setTempData] = useState(null);
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
                setTempData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching Temp data:', error);
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
        <Box>
            {tempData ? (<Box>
                {tempData.map(function (a) {
                    return <Box key={a.id} marginLeft='20px'>
                        <Typography variant='h2'>{a.data.temp.value}°C</Typography>
                    </Box>
                })}
            </Box>) : error ? (
                <>Temp...</>
            ) :
                (
                    <>Temp...</>
                )}
        </Box>
    );
}

export default LGCurrentTemp;
