import React, { useState, useEffect } from 'react';

function LGStation() {
    const [station, setStation] = useState([]);
    const [error, setError] = useState(null);

    const fetchDataWithRetry = () => {
        // Fetch data from the airvisual API
        fetch('https://e5f1-119-76-183-133.ngrok-free.app/test', {
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch station');
                }
                return response.json();
            })
            .then((data) => {
                // Filter data where id is equal to "1"
                const filteredData = data.filter((item) => item.id === "1");
                setStation(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching station:', error);
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
            {station.length > 0 ? (
                <div>
                    {station.map(function (a) {
                        return <div key={a.id}>
                            Station: {a.station}
                        </div>
                    })}
                </div>
            ) : error ? (
                <p>Loading station...</p>
            ) :
                (
                    <p>Loading station...</p>
                )}
        </div>
    );
}

export default LGStation;