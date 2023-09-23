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
import uns1501 from '../assetAQI/uns1501.png';
import uns1502 from '../assetAQI/uns1502.png';
import LGPMInfo from '../emrontech/learningGarden/pm';
import { useMediaQuery, useTheme } from '@mui/material';

function CurrentAqiInfo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen
    const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState(null);

    // Define different styles for mobile and desktop
    const mobileStyles = {
        width: '350px', // Make the box full width on mobile
        paddingTop: '20px',
        paddingBottom: '20px', // Reduce padding on mobile// Reduce padding on mobile
        fontSize: '10px', // Reduce font size on mobile
        borderRadius: '25px',
};

const desktopStyles = {
    width: '540px',
    borderRadius: '25px',
    paddingLeft: '40px',
    paddingTop: '15px',
};

const fetchDataWithRetry = () => {
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
            setTimeout(() => {
                fetchDataWithRetry();
            }, 60000);
        });
};

const calculateAqiWord = (aqiValue) => {
    if (aqiValue >= 0 && aqiValue <= 50) {
        return "Good";
    } else if (aqiValue <= 100) {
        return "Moderate";
    } else if (aqiValue <= 150) {
        return "Unhealthy";
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
    circleColor = '#ABD162';
} else if (aqiData && aqiData.data.aqi <= 100) {
    circleColor = '#F7D460';
} else if (aqiData && aqiData.data.aqi <= 150) {
    circleColor = '#FC9956';
} else if (aqiData && aqiData.data.aqi <= 200) {
    circleColor = '#F6676B';
} else if (aqiData && aqiData.data.aqi <= 300) {
    circleColor = '#A37DB8';
} else {
    circleColor = '#A07684';
}

const getImageSource1 = (aqiValue) => {
    if (aqiValue >= 0 && aqiValue <= 50) {
        return good501;
    } else if (aqiValue <= 100) {
        return moderate1001;
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
        return "Enjoy outdoor activities";
    } else if (aqiValue <= 100) {
        return "Avoid outdoor acitivities";
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
        return "Open Windows for fresh air";
    } else if (aqiValue <= 100) {
        return "Wear a mask";
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
        return good502;
    } else if (aqiValue <= 100) {
        return moderate1002;
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


const imageSource1 = getImageSource1(aqiData ? aqiData.data.aqi : null);
const imageSource2 = getImageSource2(aqiData ? aqiData.data.aqi : null);

useEffect(() => {
    fetchDataWithRetry();
    const intervalId = setInterval(fetchDataWithRetry, 60000);
    return () => clearInterval(intervalId);
}, []);

return (
    <Box
        display="flex"
        flexDirection="column" // Center vertically and horizontally
        alignItems="center" // Center horizontally
        justifyContent="center" // Center vertically
    // Set container height to viewport height for centering
    >
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            bgcolor="#FFFF"
            {...(isMobile ? mobileStyles : desktopStyles)} // Apply styles conditionally
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                marginBottom={isMobile ? '0px' : '15px'} // Adjust margin for mobile
                paddingLeft={isMobile ? '30px' : '80px'} // Adjust padding for mobile
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    marginBottom={isMobile ? '0px' : '15px'} // Adjust margin for mobile
                >
                    <Box
                        width={isMobile ? '10px' : '15px'} // Adjust circle size for mobile
                        height={isMobile ? '10px' : '15px'} // Adjust circle size for mobile
                        borderRadius="50%"
                        marginRight={isMobile ? '10px' : '15px'} // Adjust margin for mobile
                        bgcolor={circleColor}
                    />
                    <Box
                        borderRadius="25px"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant={isMobile ? 'body2' : 'h5'}paddingTop="10px" fontWeight="500">
                            AQI
                        </Typography>
                        <Typography variant={isMobile ? 'body1' : 'h4'} fontWeight="500">
                            {aqiData ? aqiData.data.aqi : 'AQI...'}
                        </Typography>
                        <Typography variant={isMobile ? 'body2' : 'h6'} marginBottom='20px'>
                            {aqiData ? calculateAqiWord(aqiData.data.aqi) : 'AQI...'}
                        </Typography>
                    </Box>
                </Box>
                <img src={imageSource1} alt="Image1" width={isMobile ? '60px' : '100px'} />
                <Typography fontSize={isMobile ? '8px' : '12px'}>
                    {aqiData ? getDesImg1(aqiData.data.aqi) : 'Loading Image Description'}
                </Typography>
            </Box>
            <Divider
                orientation={isMobile ? 'vertical' : 'vertical'}
                flexItem
                style={{
                    marginTop: isMobile ? '5px' : '10px', // Adjust margin for mobile
                    border: '0.1px solid #000',
                    height: isMobile ? '70px' : '100px', // Adjust height for mobile
                    marginLeft: isMobile ? '10px' : '30px', // Adjust margin for mobile
                    marginRight: isMobile ? '10px' : '', // Adjust margin for mobile

                }}
            />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                paddingLeft={isMobile ? '20px' : '60px'} // Adjust padding for mobile
                marginBottom={isMobile ? '0px' : '15px'} // Adjust margin for mobile
            >
                <br />
                <LGPMInfo />
                <br />
                <br />
                <img src={imageSource2} alt="Image2" width={isMobile ? '60px' : '100px'} />
                <Typography fontSize={isMobile ? '8px' : '12px'}>
                    {aqiData ? getDesImg2(aqiData.data.aqi) : 'Loading Image Description'}
                </Typography>
            </Box>
            <Box />
        </Box></Box>
);
}

export default CurrentAqiInfo;
