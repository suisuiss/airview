import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function FBPMInfo() {
    const [pmData, setPMData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "2");
                setPMData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching PM data:', error);
                setError(error);
            });
    };

    useEffect(() => {
        fetchData(); 

        const intervalId = setInterval(fetchData, 300000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Typography fontSize='18px'>
                {pmData ? (<div>
                    {pmData.map(function (a) {
                        return <div key={a.id}>
                            PM 2.5 : {a.data.pm25.value} µg/m<br />
                            PM 10 : {a.data.pm10.value} µg/m
                        </div>
                    })}
                </div>) : error ? (
                    <>Loading PM data...</>
                ) :
                    (
                        <>Loading PM data...</>
                    )}
            </Typography>
        </div>
    );
}

export default FBPMInfo;
