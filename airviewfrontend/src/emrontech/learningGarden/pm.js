import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function LGPMInfo() {
    const [pmData, setPMData] = useState(null);
    const [error, setError] = useState(null);
    const fetchDataWithRetry = () => {
        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "1");
                setPMData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching PM data:', error);
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
        <div><Typography fontSize='18px'>
            {pmData ? (<div>
                {pmData.map(function (a) {
                    return <div key={a.id}>
                        PM 2.5 : {a.data.pm25.value} µg/m<br />
                        PM 10 : {a.data.pm10.value} µg/m
                       
                    </div>
                })}
            </div>) : error ? (
                <p>Loading PM data...</p>
            ) :
                (
                    <p>Loading PM data...</p>
                )}
            
                </Typography>
        </div>
    );

}



export default LGPMInfo;