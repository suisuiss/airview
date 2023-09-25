import { Box, Typography, useMediaQuery, useTheme,Dialog, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import humidityIcon from '../../assetIcon/humidity.png';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close'; 

function FBHumidityInfo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const [humidityData, setHumidityData] = useState(null);
    const [error, setError] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false); 
    const fetchData = () => {
        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "2");
                setHumidityData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching Humidity data:', error);
                setError(error);
            });
    };

    const humidityWord = (humidityValue) => {
        if (humidityValue < 30) {
            return "Too Low";
        } else if (humidityValue <= 50) {
            return "Ideal";
        } else if (humidityValue > 50) {
            return "Too High";
        };
    }

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, 300000);

        return () => clearInterval(intervalId);
    }, []);
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = (e) => {
        e.stopPropagation(); 
        setPopupOpen(false);
    };

    return (
        <Box
            height={isMobile ? '110px' : '165px'} 
            width={isMobile ? '170px' : '260px'} 
            bgcolor="#FFFF"
            borderRadius="25px"
            marginTop={isMobile ? '5px' : '10px'}
            marginLeft={isMobile ? '0px' : '20px'} 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            onClick={handleOpenPopup}
            style={{ cursor: 'pointer' }}
        >
            <Dialog
                open={isPopupOpen}
                onClose={handleClosePopup}
                maxWidth="md"
                fullWidth
            >
                <Box p={2}>
                    {/* Close button */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClosePopup}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            right: '8px',
                            top: '8px',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" align="center">
                        AQI Details
                    </Typography>

                </Box>
            </Dialog>

            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={isMobile ? '5px' : '10px'} marginTop={isMobile ? '5px' : '10px'}>
                <Box display="flex" flexDirection="row">
                    <Typography variant={isMobile ? 'body2' : 'h6'} fontWeight="500">
                        Humidity
                    </Typography>
                    <Box marginLeft={isMobile ? '20px' : '40px'}> 
                        <img src={humidityIcon} alt="Image2" width={isMobile ? '12px' : '15px'} /> 
                    </Box>
                </Box>
                <Typography variant={isMobile ? 'body1' : 'h4'} marginTop={isMobile ? '5px' : '10px'}> 
                    {humidityData ? (
                        <div>
                            {humidityData.map(function (a) {
                                return <div key={a.id}>{a.data.humid.value}%</div>
                            })}
                        </div>
                    ) : error ? (
                        <>Humidity...</>
                    ) : (
                        <>Humidity...</>
                    )}
                </Typography>
                <Typography variant={isMobile ? 'body2' : 'body1'} marginBottom={isMobile ? '5px' : '10px'}> 
                    {humidityData ? (
                        <div>{humidityWord(humidityData[0].data.humid.value)}</div>
                    ) : (
                        <>Humidity...</>
                    )}
                </Typography>
                <LinearProgress
                    sx={{
                        width: '100%',
                        height: '8px',
                        borderRadius: '15px',
                        backgroundColor: '#ccc',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#90D02F',
                        },
                    }}
                    variant="determinate"
                    value={humidityData ? humidityData[0].data.humid.value : 0}
                />
            </Box>
        </Box>
    );
}

export default FBHumidityInfo;