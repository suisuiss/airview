import React, { useState, useEffect } from 'react';

function OverallInfo(props) {
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
                            Heat Index : {overallData[0].data.wbgt.value} &#176;C <br /> 
                            Tempurature : {overallData[0].data.temp.value} &#176;C <br /> 
                            Humidity : {overallData[0].data.humid.value} % <br /> 
                            Rainfall : {overallData[0].data.rain_fall.value} mm. 
                        </div> 
                    </div>}
                    {props.location === 'FIBO' && <div>
                        <div>
                            Heat Index : {overallData[1].data.wbgt.value} &#176;C <br /> 
                            Tempurature : {overallData[1].data.temp.value} &#176;C <br /> 
                            Humidity : {overallData[1].data.humid.value} % <br /> 
                            Rainfall : {overallData[1].data.rain_fall.value} mm. 
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

export default OverallInfo;
