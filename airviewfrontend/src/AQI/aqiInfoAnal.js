import React, { useState, useEffect } from 'react';

export const AqiInfoAnal = () => {
    const [aqiData, setAqiData] = useState(null);
    const [currentAqi, setCurrentAqi] = useState(0.123);
    const [error, setError] = useState(null);

    const fetchDataWithRetry = () => {
        fetch('https://api.waqi.info/feed/bangkok/?token=93251e1c93612cabd3b0bd3214148bb64039c4ec')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch AQI');
                }
                return response.json();
            })
            .then((data) => {
                setAqiData(data); 
                setCurrentAqi(data.data.aqi)
            })
            .catch((error) => {
                console.error('Error fetching AQI data:', error);
                setError(error);
                setTimeout(() => {
                    fetchDataWithRetry();
                }, 60000);
            });
    };

    useEffect(() => {
        fetchDataWithRetry();
        const interval = setInterval(() => {
            fetchDataWithRetry();
        }, 300000);
        return () => clearInterval(interval);
      }, []);

    return (
        <div>
            {aqiData ? (
                <div>
                    AQI<br />
                    {currentAqi}
                </div>
            ) : error ? (
                <p>Loading AQI data...</p>
            ) : (
                <p>Loading AQI data...</p>
            )}
        </div>
    );
}
export default AqiInfoAnal;
