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
    const [aqiData, setAqiData] = useState([]);
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
            setAqiData(data);
        })
        .catch((error) => {
            console.error('Error fetching AQI forecasted data:', error);
        });
    };

    useEffect(() => {
        fetchData();
        fetchAqiData();
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);
        const intervalId2 = setInterval(fetchAqiData, 1000*60*60)
        return () => {clearInterval(intervalId);
        clearInterval(intervalId2);}
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
            // Get the current hour of the day (e.g., 3:30 PM would be hour 15)
            const currentHour = new Date().getHours();

            // Get the hour from the 'date' field of the weather data
            const dataHour = new Date(data.date).getHours();

            // Check if the data corresponds to the next hour
            // (e.g., if it's currently 3:30 PM, it checks if the data is for 4:00 PM)
            return dataHour === currentHour + 1;
        });
        const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0; // make a starting index which is 1 hour ahead
        const now = new Date();
        const localTimeZone = 'Asia/Bangkok';

        const formatter = new Intl.DateTimeFormat('en-US', { timeZone: localTimeZone, hour12: false });
        const filteredData = aqiData?.filter((item) => {
            const date = new Date(item.hourly_date);
            const formattedDate = formatter.format(date);

            return new Date(formattedDate) > now;
        });
        const slicedAqiData = filteredData?.slice(3, 3 + 3);
        const aqiToColor = {
            0: "#00E400",  // Good
            50: "#FFFF00", // Moderate
            100: "#FF7E00", // Unhealthy for Sensitive Groups
            150: "#FF0000", // Unhealthy
            200: "#99004C", // Very Unhealthy
            300: "#7E0023", // Hazardous
        };
        const getAqiColor = (aqi) => {
            // Initialize variables to track the closest level and color
            let closestLevel = 0;
            let closestColor = "#00E400"; // Default to "Good" level
          
            // Find the appropriate color based on AQI
            for (const level in aqiToColor) {
              if (aqi >= level && level >= closestLevel) {
                closestLevel = level;
                closestColor = aqiToColor[level];
              }
            }
          
            return closestColor;
        };
        
                

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

                        <Box borderRadius="10px" bgcolor={getAqiColor(slicedAqiData[index]?.hourly_AQI)} width="70px" height="35px" display="flex" justifyContent="center" alignItems="center">
                            <Typography fontSize='11px' color='black' style={{ textAlign: 'center' }}>AQI<br />
                                {slicedAqiData[index]?.hourly_AQI}</Typography>
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
        const now = new Date();
        const localTimeZone = 'Asia/Bangkok';

        const formatter = new Intl.DateTimeFormat('en-US', { timeZone: localTimeZone, hour12: false });
        const filteredData = aqiData?.filter((item) => {
            const date = new Date(item.hourly_date);
            const formattedDate = formatter.format(date);

            return new Date(formattedDate) > now;
        });
        const slicedAqiData = filteredData?.slice(6, 6 + 3);
        const aqiToColor = {
            0: "#00E400",  // Good
            50: "#FFFF00", // Moderate
            100: "#FF7E00", // Unhealthy for Sensitive Groups
            150: "#FF0000", // Unhealthy
            200: "#99004C", // Very Unhealthy
            300: "#7E0023", // Hazardous
        };
        const getAqiColor = (aqi) => {
            // Initialize variables to track the closest level and color
            let closestLevel = 0;
            let closestColor = "#00E400"; // Default to "Good" level
          
            // Find the appropriate color based on AQI
            for (const level in aqiToColor) {
              if (aqi >= level && level >= closestLevel) {
                closestLevel = level;
                closestColor = aqiToColor[level];
              }
            }
            return closestColor;
        };
        

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
                        <Box borderRadius="10px" bgcolor={getAqiColor(slicedAqiData[index]?.hourly_AQI)} width="70px" height="35px" display="flex" justifyContent="center" alignItems="center">
                            <Typography fontSize='11px' color='black' style={{ textAlign: 'center' }}>AQI<br />
                                {slicedAqiData[index]?.hourly_AQI}</Typography>
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
                    <Typography fontSize="14px">
                        No rain expected
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