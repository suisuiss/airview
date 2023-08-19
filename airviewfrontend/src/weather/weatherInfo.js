import React, { useState, useEffect } from 'react';

function WeatherInfo() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                'https://www.meteosource.com/api/v1/free/point?place_id=postal-th-10140&sections=current%2Chourly&language=en&units=auto&key=t66kz0c4o4d1oi27t84scaz7kiiof5id124hfdx9'
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            {weatherData ? (
                <div>
                    <h2>Current Weather</h2>
                    <p>Temperature: {weatherData.current.temperature}°C</p>
                    <p>Humidity: {weatherData.current.humidity}%</p>
                    {/* Add more data points as needed */}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default WeatherInfo;
