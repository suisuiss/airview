import React, { useState, useEffect } from 'react';

function HumidityInfo() {
    const [humidityData, setHumidityData] = useState(null);
    useEffect(() => {
        // Fetch data from the airvisual API
        fetch('https://emtrontech.com/KMUTT_MET/data/get_data.php')
            .then((response) => response.json())
            .then((data) => {
                setHumidityData(data);
            })
            .catch((error) => {
                console.error('Error fetching humidity data:', error);
            });
    }, []);

    return (
        <div>
            {humidityData ? (<div>
                {humidityData.map(function(a){
                    return <div>
                        Humidity: {a.data.humid.value}
                    </div>
                })}
            </div>) : (
                <p>Loading Humidity data...</p>
            )}
        </div>
    );

}



export default HumidityInfo;
