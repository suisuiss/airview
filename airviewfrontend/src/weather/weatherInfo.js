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

    useEffect(() => {
        fetchData();
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

        //gonna send noti if rain data is avail
        
        // const sendRainNoti = async () => {
        //     const publicKey = 'BCS5nEpceVPUCj2GyPSEL0rOmhi4dfE_dYxTOY3pIm_C_o3NdE4_zLk7_7aAooWKCgEes9oAWmlTUcwb_t6Kfvo';
        //     const registration = await navigator.serviceWorker.ready;
        //     const subscription = await registration.pushManager.subscribe({
        //         userVisibleOnly: true,
        //         applicationServerKey: publicKey
        //     });

        //     // const requestData = {
        //     //     subscription: subscription,
        //     //     time: formatTime(rainData.date),
        //     // };
        //     const response = await fetch('http://localhost:4000/rainnoti', {
        //         method: 'POST',
        //         body: JSON.stringify(subscription),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //     console.log('rain noti sent!!!')
        // }
        const storedIsSub = localStorage.getItem('isSub');
        const sendRainNoti = async () => {
            const publicKey = 'BCS5nEpceVPUCj2GyPSEL0rOmhi4dfE_dYxTOY3pIm_C_o3NdE4_zLk7_7aAooWKCgEes9oAWmlTUcwb_t6Kfvo';
            // Check when the last notification was sent
            await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then((registration) => {
        console.log('(from noti.js)Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.warn('(from noti.js)Service Worker registration failed:', error);
      });
            const lastWNotificationTime = localStorage.getItem('lastWNotificationTime');
            if (!lastWNotificationTime || Date.now() - parseInt(lastWNotificationTime) >= 2*60*60* 1000) {
              const registration = await navigator.serviceWorker.ready;
              const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicKey,
              });
          
              const response = await fetch('http://localhost:4000/rainnoti', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.ok) {
                console.log('rain Request was sucessfully sent.');
                  }
          
              console.log('Notification sent');
              // Store the current time as the last notification time
              localStorage.setItem('lastWNotificationTime', Date.now().toString());
            } else {
              console.log('Notification is on cooldown');
              console.log("last weather noti is",lastWNotificationTime)
            }
          };
 
        const checkRain =()=>{
            if ( storedIsSub && rainData != null) {
                console.log(rainData.date);
                sendRainNoti();
            }else return;
        }
        // checkRain();
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