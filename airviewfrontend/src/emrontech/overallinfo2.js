import React, { useState, useEffect } from 'react';

function OverallInfo2(props) {
    const [overallData, setOverallData] = useState(null);
    const [error, setError] = useState(null);
    const fetchDataWithRetry = () => {
        // Fetch data from the airvisual API
        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                setOverallData(data);
            })
            .catch((error) => {
                console.error('Error fetching Overall data:', error);
                setError(error);

                // Retry the request after a delay (e.g., 5 seconds)
                setTimeout(() => {
                    fetchDataWithRetry();
                }, 5000); // 5 seconds
            });
    };

    useEffect(() => {
        fetchDataWithRetry();
        const interval = setInterval(() => {
            fetchDataWithRetry();
        }, 180000);
        return () => clearInterval(interval);
      }, []);

    return (
        <div>
            {overallData ? (
                <div>
                    {props.location === 'LearningGarden' && 
                    <div>
                        <div>
                            Wind Speed : {overallData[0].data.wind_speed.value} m/s <br /> 
                            Wind Direction : {overallData[0].data.wind_direction.value} degree <br /> 
                            WBGT : {overallData[0].data.wbgt.value} &#176;C
                        </div>
                    </div>}
                    {props.location === 'FIBO' && <div>
                        <div>
                            Wind Speed : {overallData[1].data.wind_speed.value} m/s <br /> 
                            Wind Direction : {overallData[1].data.wind_direction.value} degree <br /> 
                            WBGT : {overallData[1].data.wbgt.value} &#176;C
                        </div>
                    </div>}
                </div>
            ) : error ? (
                <p>Loading Overall data...</p>
            ) : (
                <p>Loading Overall data...</p>
            )}
        </div>
    );
}

export default OverallInfo2;
