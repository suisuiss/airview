import React, { useState, useEffect } from 'react';

function LGHumidityInfo() {
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
        <div>
            {humidityData ? (<div>
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
                )}
        </div>
    );

}



export default LGHumidityInfo;