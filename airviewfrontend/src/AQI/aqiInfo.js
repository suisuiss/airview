import React, { useState, useEffect } from 'react';

function AqiInfo() {
    const [aqiData, setAqiData] = useState(null);
    useEffect(() => {
        // Fetch data from the airvisual API
        fetch('http://api.airvisual.com/v2/nearest_city?lat=13.651502404577384&lon=100.49644279537901&key=c931c788-4515-48dc-8c74-1fd47b9817f7')
            .then((response) => response.json())
            .then((data) => {
                setAqiData(data);
            })
            .catch((error) => {
                console.error('Error fetching AQI data:', error);
            });
    }, []);

    return (
        <div>
            {aqiData ? (<div>
                current AQI: {aqiData.data.current.pollution.aqius}
            </div>) : (
                <p>Loading AQI data...</p>
            )}
        </div>
    );

}



export default AqiInfo;
