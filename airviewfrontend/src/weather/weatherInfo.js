import React, { useState, useEffect } from 'react';

function WeatherInfo() {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        // Fetch data from the meteosource API
        fetch('https://www.meteosource.com/api/v1/free/point?place_id=postal-th-10140&sections=current%2Chourly&language=en&units=auto&key=t66kz0c4o4d1oi27t84scaz7kiiof5id124hfdx9')
            .then((response) => response.json())
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => {
                console.error('Error fetching Meteosource data:', error);
            })
    }, []);

    return (
        <div>
            {weatherData ? (
                <div>
                    <h2>Weather Forcast</h2>
                    <p>Temperature: {weatherData.current.temperature}°C</p>
                    <p>Windspeed: {weatherData.current.wind.speed}</p>
                    {weatherData.hourly.data.map(function (data, i) {

                        if (i > 0 && i < 6) {
                            i++;
                            return <div>
                                Time: {data.date}<br />
                                Hourly Temperature: {data.temperature}°C<br />
                                Weather: {data.weather}
                                <br /><br />
                            </div>
                        }

                    })}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}

        </div>
    );

}



export default WeatherInfo;
