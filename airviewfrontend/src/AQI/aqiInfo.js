import React, { useState, useEffect } from 'react';

function AqiInfo() {
    const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState(null);

    const fetchDataWithRetry = () => {
        // Fetch data from the airvisual API
        fetch('http://api.airvisual.com/v2/nearest_city?lat=13.651502404577384&lon=100.49644279537901&key=c931c788-4515-48dc-8c74-1fd47b9817f7')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
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
                }, 5000); // 5 seconds
            });
    };

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
    }, []);

    return (
        <div>
            {aqiData ? (
                <div>
                    current AQI: {aqiData.data.current.pollution.aqius}
                </div>
            ) : error ? (
                <p>Loading AQI data...</p>
            ) : (
                <p>Loading AQI data...</p>
            )}
        </div>
    );
}

export default AqiInfo;
