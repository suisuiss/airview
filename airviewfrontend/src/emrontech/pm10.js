import React, { useState, useEffect } from 'react';

function Pm10Info(props) {
    const [pm10Data, setPm10Data] = useState(null);
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
                setPm10Data(data);
            })
            .catch((error) => {
                console.error('Error fetching PM10 data:', error);
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
            {pm10Data ? (<div>
                    {props.location === 'LearningGarden' && <div>PM 10 : {pm10Data[0].data.pm10.value}  &#181;g/m<sup>3</sup></div>}
                    {props.location === 'FIBO' && <div>PM 10 : {pm10Data[1].data.pm10.value}  &#181;g/m<sup>3</sup></div>}
            </div>) : error ? (
                <p>Loading PM 10 data...</p>
            ) :
                (
                    <p>Loading PM 10 data...</p>
                )}
        </div>
    );

}



export default Pm10Info;
