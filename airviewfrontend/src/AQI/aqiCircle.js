import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function AqiCircle() {
    const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState(null);

    const fetchDataWithRetry = () => {
        // Fetch data from the airvisual API
        fetch('https://api.airvisual.com/v2/nearest_city?lat=13.651502404577384&lon=100.49644279537901&key=c931c788-4515-48dc-8c74-1fd47b9817f7')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch AQI');
                }
                return response.json();
            })
            .then((data) => {
                setAqiData(data);
            })
            .catch((error) => {
                console.error('Error fetching AQI data:', error);
                setError(error);

                // Retry the request after a delay (e.g., 5 seconds)
                setTimeout(() => {
                    fetchDataWithRetry();
                }, 60000); // 5 seconds
            });
    };

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
        const intervalId = setInterval(fetchDataWithRetry, 60000); // Set up an interval to fetch data every minute
        return () => clearInterval(intervalId);
    }, []);

    // Determine the background color based on the AQI value
    let circleColor = '';
    if (aqiData && aqiData.data.current.pollution.aqius >= 0 && aqiData.data.current.pollution.aqius <= 50) {
        circleColor = '#ABD162'; // Green
    } else if (aqiData && aqiData.data.current.pollution.aqius <= 100) {
        circleColor = '#F7D460'; // Yellow
    } else if (aqiData && aqiData.data.current.pollution.aqius <= 150) {
        circleColor = '#FC9956'; // Orange
    } else if (aqiData && aqiData.data.current.pollution.aqius <= 200) {
        circleColor = '#F6676B'; // Red
    } else if (aqiData && aqiData.data.current.pollution.aqius <= 300) {
        circleColor = '#A37DB8'; // Purple
    } else {
        circleColor = '#A07684'; // Gray
    }

    return (
        <div>
            {aqiData ? (
                <div>
                    <Box
                        width="22px"
                        height="22px"
                        borderRadius="50%"
                        bgcolor={circleColor}
                    />
                    {/* Current AQI: {aqiData.data.current.pollution.aqius} */}
                </div>
            ) : error ? (
                <p>Loading AQI data...</p>
            ) : (
                <p>Loading AQI data...</p>
            )}
        </div>
    );
}

export default AqiCircle;
