import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

function FBHeatIndex() {
    const [heatData, setHeatData] = useState(null);
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
                const filteredData = data.filter((item) => item.id === "2");
                setHeatData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching HI data:', error);
                setError(error);
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
            {heatData ? (
                <div>
                    {heatData.map(function (a) {
                        const T = (parseFloat(a.data.temp.value) * 9 / 5) + 32;
                        const RH = parseFloat(a.data.humid.value);
                        const HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (RH * 0.094));

                        return (
                            <div key={a.id}>
                                Feels like {((HI - 32) * (5 / 9)).toFixed(2)}°C
                            </div>
                        );
                    })}
                </div>
            ) : error ? (
                <p>HI...</p>
            ) : (
                <p>HI...</p>
            )}
        </Box>
    );
}

export default FBHeatIndex;
