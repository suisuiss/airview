import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function WeatherInfo() {
    const [weatherData, setWeatherData] = useState(null);
    const [iconImages, setIconImages] = useState([]);

    const fetchWeatherData = () => {
        fetch('https://www.meteosource.com/api/v1/free/point?place_id=postal-th-10140&sections=current%2Chourly&language=en&units=auto&key=t66kz0c4o4d1oi27t84scaz7kiiof5id124hfdx9')
            .then((response) => response.json())
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => {
                console.error('Error fetching Meteosource data:', error);
            });
    };

    useEffect(() => {
        fetchWeatherData();
        const intervalId = setInterval(fetchWeatherData, 300000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const importIconImages = async () => {
            const imports = [];
            for (let i = 1; i <= 36; i++) {
                const image = await import(`../assetWeather/${i}.png`);
                imports.push(image.default);
            }
            setIconImages(imports);
        };

        importIconImages();
    }, []);




    return (
        <Box>
            {weatherData ? (
                <Box>
                    <img src={iconImages[weatherData.current.icon_num - 1]} alt="Weather Icon" width='95px' />
                    <br />
                    <Typography variant='h5'>   {capitalizeFirstLetter(weatherData.current.icon)}</Typography>

                </Box>
            ) : (
                <>Loading weather data...</>
            )}
        </Box>
    );
}

export default WeatherInfo;
