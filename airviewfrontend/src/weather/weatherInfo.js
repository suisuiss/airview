import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import warning from '../assetIcon/warning.png'

function formatTime(dateString) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-US', options);
}

function WeatherForecastInfo() {
    const [weatherData, setWeatherData] = useState(null);
    const [iconImages, setIconImages] = useState([]);

    const fetchData = () => {
        // Fetch data from the meteosource API
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
        // Initial fetch
        fetchData();

        // Fetch data every 5 minutes
        const intervalId = setInterval(fetchData, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Dynamically import icon images from 1.png to 36.png
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

    const renderHourlyWeather1 = () => {
        // Find the index of the current hour
        const currentHourIndex = weatherData?.hourly?.data.findIndex((data) => {
            const currentHour = new Date().getHours();
            const dataHour = new Date(data.date).getHours();
            return dataHour === currentHour + 1;
        });

        // Render from the next hour if found, else render all
        const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

        return (
            <Box style={{ display: "flex", flexDirection: "row" }}>
                {weatherData?.hourly?.data?.slice(startIndex, startIndex + 3).map((data, index) => (
                    <Box key={index} display="flex" flexDirection="column" alignItems="center" paddingLeft="40px" paddingRight="40px">

                        {formatTime(data.date)}<br />
                        <img src={iconImages[data.icon - 1]} alt="Weather Icon" width='70px' />
                        {data.temperature}°C
                        {/* AQI box add here */}
                        <Box borderRadius="10px" bgcolor="#90D02F" width="70px" height="35px" display="flex" justifyContent="center" alignItems="center">
                            <Typography fontSize='11px' color='#FFFF' style={{ textAlign: 'center' }}>AQI<br />
                                0-50</Typography>
                        </Box>

                    </Box>
                ))}
            </Box>
        );
    };
    const renderHourlyWeather2 = () => {
        // Find the index of the current hour
        const currentHourIndex = weatherData?.hourly?.data.findIndex((data) => {
            const currentHour = new Date().getHours();
            const dataHour = new Date(data.date).getHours();
            return dataHour === currentHour + 1;
        });

        // Render from the next hour if found, else render all
        const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

        return (
            <Box style={{ display: "flex", flexDirection: "row" }}>
                {weatherData?.hourly?.data?.slice(startIndex + 3, startIndex + 6).map((data, index) => (
                    <Box key={index} display="flex" flexDirection="column" alignItems="center" paddingLeft="40px" paddingRight="40px" >
                        {formatTime(data.date)}<br />
                        <img src={iconImages[data.icon - 1]} alt="Weather Icon" width='70px' />
                        {data.temperature}°C
                        {/* AQI box add here */}
                        <Box borderRadius="10px" bgcolor="#90D02F" width="70px" height="35px" display="flex" justifyContent="center" alignItems="center">
                            <Typography fontSize='11px' color='#FFFF' style={{ textAlign: 'center' }}>
                                AQI<br />
                                0-50
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        );
    };

    const renderHourlyWeatherRain = () => {
        const isRaining = weatherData?.hourly?.data?.slice(1, 7).some(data => data.summary.includes("rain"));

        return (
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom="10px">
                {isRaining && <img src={warning} alt="Warning Icon" width="20px" style={{ marginRight: '5px', }} />}
                <Typography fontSize="14px">
                    {isRaining ? "Raining expected around " : ""}
                    {isRaining ? formatTime(weatherData?.hourly?.data[1].date) : ""}
                </Typography>
            </Box>
        );
    };



    return (
        <Box bgcolor='#FFFF' marginTop="10px" width='540px' borderRadius='25px' paddingTop='10px' paddingBottom='10px' display="flex" flexDirection="column" alignItems="center">
            {weatherData ? (
                <Box>
                    {renderHourlyWeatherRain()}
                    {renderHourlyWeather1()}
                    <Box height='10px'/>
                    {renderHourlyWeather2()}
                </Box>
            ) : (
                <p>Loading weather data...</p>
            )}
        </Box>
    );
}

export default WeatherForecastInfo;
