import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import warning from '../assetIcon/warning.png';

function formatTime(dateString) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-US', options);
}

function WeatherForecastInfo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [weatherData, setWeatherData] = useState(null);
    const [iconImages, setIconImages] = useState([]);
    const mobileStyles = {
        width: '350px',
        paddingTop: '10px', 
        paddingBottom: '10px', 
        fontSize: '12px', 
        borderRadius: '25px',
        marginBottom: '10px',
        
        
    };

    const desktopStyles = {
        width: '540px', 
        borderRadius: '25px',
        
        paddingTop: '10px',
        paddingBottom: '10px',
    };

    const fetchData = () => {
        fetch('https://www.meteosource.com/api/v1/free/point?place_id=postal-th-10140&sections=current%2Chourly&language=en&units=auto&key=t66kz0c4o4d1oi27t84scaz7kiiof5id124hfdx9')
            .then((response) => response.json())
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => {
                console.error('Error fetching Meteosource data:', error);
            });
    };

    const fetchAqiData = () => {
        fetch('http://localhost:5000/get-forecasted-aqi') // Update with your backend API endpoint
        .then((response) => response.json())
        .then((data) => {
            console.log("data")
        })
        .catch((error) => {
            console.error('Error fetching AQI forecasted data:', error);
        });
    };

    useEffect(() => {
        fetchData();
        fetchAqiData();
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);
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

    const renderHourlyWeather1 = () => {
        const currentHourIndex = weatherData?.hourly?.data.findIndex((data) => {
            const currentHour = new Date().getHours();
            const dataHour = new Date(data.date).getHours();
            return dataHour === currentHour + 1;
        });
        const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

        return (
            <Box style={{ display: "flex", flexDirection: "row" }}>
                {weatherData?.hourly?.data?.slice(startIndex, startIndex + 3).map((data, index) => (
                    <Box key={index} display="flex" flexDirection="column" alignItems="center" {...(isMobile
                        ? { paddingLeft: '25px', paddingRight: '20px' }
                        : { paddingLeft: '60px', paddingRight: '40px' }
                    )}>

                        {formatTime(data.date)}<br />
                        <img src={iconImages[data.icon - 1]} alt="Weather Icon" width='70px' />
                        {data.temperature}°C
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
        const currentHourIndex = weatherData?.hourly?.data.findIndex((data) => {
            const currentHour = new Date().getHours();
            const dataHour = new Date(data.date).getHours();
            return dataHour === currentHour + 1;
        });
        const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

        return (
            <Box style={{ display: "flex", flexDirection: "row" }}>
                {weatherData?.hourly?.data?.slice(startIndex + 3, startIndex + 6).map((data, index) => (
                    <Box key={index} display="flex" flexDirection="column" alignItems="center" {...(isMobile
                        ? { paddingLeft: '25px', paddingRight: '20px' } 
                        : { paddingLeft: '60px', paddingRight: '40px' } 
                    )} >
                        {formatTime(data.date)}<br />
                        <img src={iconImages[data.icon - 1]} alt="Weather Icon" width='70px' />
                        {data.temperature}°C
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
        const currentHourIndex = weatherData?.hourly?.data.findIndex((data) => {
            const currentHour = new Date().getHours();
            const dataHour = new Date(data.date).getHours();
            return dataHour === currentHour + 1;
        });
        const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

        const rainData = weatherData?.hourly?.data.slice(startIndex, startIndex + 6).find(data => data.summary.includes("rain") || data.summary.includes("Thunderstorm") || data.summary.includes("Rain"));

        if (rainData) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" marginBottom="10px">
                    <img src={warning} alt="Warning Icon" width="20px" style={{ marginRight: '5px', }} />
                    <Typography fontSize="14px">
                        {rainData.summary} is expected around {formatTime(rainData.date)}
                    </Typography>
                </Box>
            );
        } else {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" marginBottom="10px">
                    <img src={warning} alt="Warning Icon" width="20px" style={{ marginRight: '5px', }} />
                    <Typography fontSize="14px">
                        Rain is expected around 3:00 AM
                    </Typography>
                </Box>
            );
        }
    };




    return (
        <Box
            bgcolor='#FFFF'
            marginTop="10px"
            {...(isMobile ? mobileStyles : desktopStyles)} 
        >
            {weatherData ? (
                <Box>
                    {renderHourlyWeatherRain()}
                    {renderHourlyWeather1()}
                    <Box height='10px' />
                    {renderHourlyWeather2()}
                </Box>
            ) : (
                <>Loading weather data...</>
            )}
        </Box>
    );
}

export default WeatherForecastInfo;