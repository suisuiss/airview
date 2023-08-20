import React, { useState, useEffect } from 'react';

function HumidityInfo() {
    const [humidityData, setHumidityData] = useState(null);
    const [error, setError] = useState(null);
    const fetchDataWithRetry = () => {
        // Fetch data from the airvisual API
        fetch('https://emtrontech.com/KMUTT_MET/data/get_data.php')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                setHumidityData(data);
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
        <div>
            {humidityData ? (<div>
                {humidityData.map(function (a) {
                    return <div>
                        Humidity: {a.data.humid.value}
                    </div>
                })}
            </div>) : error ? (
                <p>Loading Humidity data...</p>
            ) :
                (
                    <p>Loading Humidity data...</p>
                )}
        </div>
    );

}



export default HumidityInfo;
