import React, { useState, useEffect } from 'react';

function AqiWord() {
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

    // Function to calculate the AQI word based on the AQI value
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

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
        const intervalId = setInterval(fetchDataWithRetry, 60000); // Set up an interval to fetch data every minute
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {aqiData ? (
                <div>
                    <div>
                        current AQI: {aqiData.data.current.pollution.aqius}
                    </div>
                    <div>
                        AQI Word: {calculateAqiWord(aqiData.data.current.pollution.aqius)}
                    </div>
                </div>
            ) : error ? (
                <p>Loading AQI data...</p>
            ) : (
                <p>Loading AQI data...</p>
            )}
        </div>
    );
}

export default AqiWord;
