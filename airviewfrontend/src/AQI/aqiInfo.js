import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import good501Image from '../assetAQI/good501.png';


function CurrentAqiInfo() {
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

    const calculateAqiWord = (aqiValue) => {
        if (aqiValue >= 0 && aqiValue <= 50) {
            return "Good";
        } else if (aqiValue <= 100) {
            return "Moderate";
        } else if (aqiValue <= 150) {
            return "Unhealthy for sensitive group";
        } else if (aqiValue <= 200) {
            return "Unhealthy";
        } else if (aqiValue <= 300) {
            return "Very unhealthy";
        } else {
            return "Hazardous";
        }
    };

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

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
        const intervalId = setInterval(fetchDataWithRetry, 60000); // Set up an interval to fetch data every minute
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" bgcolor="#FFFF" width='10%' >
            <Box display="flex" flexDirection="row" alignItems="center" bgcolor="#FFFF" >
                <Box
                    width="15px"
                    height="15px"
                    borderRadius="50%"
                    bgcolor={circleColor}
                />
                <Box display="flex" flexDirection="column" alignItems="center" bgcolor="#FFFF" >
                    <Typography variant="h6" fontWeight="500">AQI</Typography>
                    <Typography variant="h5" fontWeight="500">{aqiData ? aqiData.data.current.pollution.aqius : 'Loading AQI data...'}</Typography>
                    <Typography variant="body1">{aqiData ? calculateAqiWord(aqiData.data.current.pollution.aqius) : ''}</Typography>
                    
                </Box>
            </Box><img src={good501Image}/>
        </Box>
    );
}

export default CurrentAqiInfo;