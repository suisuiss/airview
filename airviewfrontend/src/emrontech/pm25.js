import React, { useState, useEffect } from 'react';

function Pm25Info(props) {
    const [pm25Data, setPm25Data] = useState(null);
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
                setPm25Data(data);
            })
            .catch((error) => {
                console.error('Error fetching PM2.5 data:', error);
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
            {pm25Data ? (<div>
                    {props.location === 'LearningGarden' && <div>PM 2.5 : {pm25Data[0].data.pm25.value}  &#181;g/m<sup>3</sup></div>}
                    {props.location === 'FIBO' && <div>PM 2.5 : {pm25Data[1].data.pm25.value}  &#181;g/m<sup>3</sup></div>}
            </div>) : error ? (
                <p>Loading PM 2.5 data...</p>
            ) :
                (
                    <p>Loading PM 2.5 data...</p>
                )}
        </div>
    );

}



export default Pm25Info;
