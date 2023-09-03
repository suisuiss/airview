import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import good501 from '../assetAQI/good501.png';
import good502 from '../assetAQI/good502.png';
import moderate1001 from '../assetAQI/moderate1001.png';
import moderate1002 from '../assetAQI/moderate1002.png';
import unhealthy2001 from '../assetAQI/unhealthy2001.png';
import unhealthy2002 from '../assetAQI/unhealthy2002.png';
import uns1501 from '../assetAQI/uns1501.png'
import uns1502 from '../assetAQI/uns1502.png'
import LGPMInfo from '../emrontech/learningGarden/pm';

function CurrentAqiInfo() {
    const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState(null);

    const fetchDataWithRetry = () => {
        // Fetch data from the airvisual API
        fetch('http://api.waqi.info/feed/bangkok/?token=93251e1c93612cabd3b0bd3214148bb64039c4ec')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch AQI');
                }
                return response.json();
            })
            .then((data) => {
                setAqiData(data);
            })
            .catch((error) => {
                console.error('Error fetching AQI data:', error);
                setError(error);

                // Retry the request after a delay (e.g., 5 seconds)
                setTimeout(() => {
                    fetchDataWithRetry();
                }, 60000); // 5 seconds
            });
    };

    const calculateAqiWord = (aqiValue) => {
        if (aqiValue >= 0 && aqiValue <= 50) {
            return "Good";
        } else if (aqiValue <= 100) {
            return "Moderate";
        } else if (aqiValue <= 150) {
            return "Unhealthy for sensitive group";
        } else if (aqiValue <= 200) {
            return "Unhealthy";
        } else if (aqiValue <= 300) {
            return "Very unhealthy";
        } else {
            return "Hazardous";
        }
    };

    let circleColor = '';
    if (aqiData && aqiData.data.aqi >= 0 && aqiData.data.aqi <= 50) {
        circleColor = '#ABD162'; // Green
    } else if (aqiData && aqiData.data.aqi <= 100) {
        circleColor = '#F7D460'; // Yellow
    } else if (aqiData && aqiData.data.aqi <= 150) {
        circleColor = '#FC9956'; // Orange
    } else if (aqiData && aqiData.data.aqi <= 200) {
        circleColor = '#F6676B'; // Red
    } else if (aqiData && aqiData.data.aqi <= 300) {
        circleColor = '#A37DB8'; // Purple
    } else {
        circleColor = '#A07684'; // Gray
    }

    const getImageSource1 = (aqiValue) => {
        if (aqiValue >= 0 && aqiValue <= 50) {
            return good501; // Return the image path
        } else if (aqiValue <= 100) {
            return moderate1001; // Return the image path
        } else if (aqiValue <= 150) {
            return uns1501;
        } else if (aqiValue <= 200) {
            return unhealthy2001;
        } else if (aqiValue <= 300) {
            return unhealthy2001;
        } else {
            return unhealthy2001;
        }
    };

    const getDesImg1 = (aqiValue) => {
        if (aqiValue >= 0 && aqiValue <= 50) {
            return "Enjoy outdoor activities"; // Return the image path
        } else if (aqiValue <= 100) {
            return "Avoid outdoor acitivities"; // Return the image path
        } else if (aqiValue <= 150) {
            return "Reduce outdoor activities";
        } else if (aqiValue <= 200) {
            return "Wear Mask";
        } else if (aqiValue <= 300) {
            return "Wear Mask";
        } else {
            return "Wear Mask";
        }
    };

    const getDesImg2 = (aqiValue) => {
        if (aqiValue >= 0 && aqiValue <= 50) {
            return "Open Windows for fresh air"; // Return the image path
        } else if (aqiValue <= 100) {
            return "Wear a mask"; // Return the image path
        } else if (aqiValue <= 150) {
            return "Wear a mask";
        } else if (aqiValue <= 200) {
            return "Wear a mask";
        } else if (aqiValue <= 300) {
            return "Wear a mask";
        } else {
            return "Wear a mask";
        }
    };

    const getImageSource2 = (aqiValue) => {
        if (aqiValue >= 0 && aqiValue <= 50) {
            return good502; // Return the image path
        } else if (aqiValue <= 100) {
            return moderate1002; // Return the image path
        } else if (aqiValue <= 150) {
            return uns1502;
        } else if (aqiValue <= 200) {
            return unhealthy2002;
        } else if (aqiValue <= 300) {
            return unhealthy2002;
        } else {
            return unhealthy2002;
        }
    };

    // Get the image source based on the AQI value
    const imageSource1 = getImageSource1(aqiData ? aqiData.data.aqi : null);
    const imageSource2 = getImageSource2(aqiData ? aqiData.data.aqi : null);

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
        const intervalId = setInterval(fetchDataWithRetry, 60000); // Set up an interval to fetch data every minute
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box display="flex" flexDirection="row" alignItems="center" bgcolor="#FFFF" width='540px' marginLeft='40px' paddingTop='15px'  borderRadius="25px">
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom='15px' paddingLeft="80px">
                <Box display="flex" flexDirection="row" alignItems="center" marginBottom="15px">
                    <Box
                        width="15px"
                        height="15px"
                        borderRadius="50%"
                        marginRight="15px"

                        bgcolor={circleColor}
                    />
                    <Box borderRadius="25px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Typography variant="h5" fontWeight="500">AQI</Typography>
                        <Typography variant="h4" fontWeight="500">{aqiData ? aqiData.data.aqi : 'AQI...'}</Typography>
                        
                        <Typography variant="h6">{aqiData ? calculateAqiWord(aqiData.data.aqi) : 'AQI...'}</Typography>
                    </Box>

                </Box>
                <img src={imageSource1} alt="Image1" width='100px' />
                <Typography fontSize='12px'>{aqiData ? getDesImg1(aqiData.data.aqi) : 'Loading Image Description'}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem style={{ marginTop: '10px', border: '0.1px solid #000', height: '100px', marginLeft: '30px' }} />
            <Box display="flex" flexDirection="column" alignItems="center" paddingLeft='60px' marginBottom='15px' >
                <br /><LGPMInfo /><br /><br/>
                <img src={imageSource2} alt="Image2" width='100px'/>
                <Typography fontSize='12px'>{aqiData ? getDesImg2(aqiData.data.aqi) : 'Loading Image Description'}</Typography>
            </Box>
            <Box />
        </Box>
    );
}

export default CurrentAqiInfo;
