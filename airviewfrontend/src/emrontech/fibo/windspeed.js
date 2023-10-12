import { Box, Typography, useMediaQuery, useTheme, Dialog, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import windIcon from '../../assetIcon/wind.png';
import CloseIcon from '@mui/icons-material/Close'; 
import wind from '../../assetPopup/windspeed.png';

function FBWindInfo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const [isPopupOpen, setPopupOpen] = useState(false); 
    const [windData, setWindData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        const delayBetweenRequests = 300000;

        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "2");
                setWindData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching Wind data:', error);
                setError(error);

                setTimeout(() => {
                    fetchData();
                }, delayBetweenRequests);
            });
    };

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, 300000);

        return () => clearInterval(intervalId);
    }, []);
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = (event) => {
        event.stopPropagation();
        setPopupOpen(false);
    };

    return (
        <Box
            height={isMobile ? '110px' : '165px'} 
            width={isMobile ? '170px' : '260px'}
            bgcolor="#FFFF"
            borderRadius="25px"
            marginTop={isMobile ? '5px' : '10px'}
            paddingTop={isMobile ? '0px' : '8px'}
            paddingBottom={isMobile ? '0px' : '5px'}
            marginLeft={isMobile ? '10px' : '20px'} 
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
                PaperProps={{
                    sx: {
                        borderRadius: '25px',
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                }}
            >
                <Box p={2}>
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

                    <img
                        src={wind}
                        alt="image"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',

                        }}
                    />

                </Box>
            </Dialog>

            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={isMobile ? '10px' : '35px'} marginTop={isMobile ? '0px' : '10px'}>
                <Box display="flex" flexDirection="row" >
                    <Typography variant={isMobile ? 'body2' : 'h6'} fontWeight="500">                         Wind
                    </Typography>
                    <Box marginLeft={isMobile ? '20px' : '40px'}>
                        <img src={windIcon} alt="Image2" width={isMobile ? '12px' : '30px'} /> 
                    </Box>
                </Box>
                <Typography variant={isMobile ? 'body2' : '18px'} marginTop={isMobile ? '0px' : '10px'}> 
                    {windData ? (
                        <div>
                            {windData.map(function (a) {
                                return <div key={a.id}>
                                    Speed: {a.data.wind_speed.value} m/s
                                </div>
                            })}
                            {windData.map(function (a) {
                                return <div key={a.id}>
                                    Direction: {a.data.wind_direction.value} degree
                                </div>
                            })}
                        </div>
                    ) : error ? (
                        <>Wind...</>
                    ) : (
                        <>Wind...</>
                    )}
                </Typography>
            </Box>
        </Box>
    );
}

export default FBWindInfo;