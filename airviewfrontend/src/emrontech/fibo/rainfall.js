import { Box, Typography, useMediaQuery, useTheme, Dialog, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import rainIcon from '../../assetIcon/rainfall.png';
import CloseIcon from '@mui/icons-material/Close';
import rain from '../../assetPopup/rain.png';

function FBRainInfo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [rainData, setRainData] = useState(null);
    const [error, setError] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false); 

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
                setRainData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching rain data:', error);
                setError(error);

                setTimeout(() => {
                    fetchData();
                }, delayBetweenRequests);
            });
    };

    const rainWord = (rainValue) => {
        if (rainValue == 0) {
            return "No Rain";
        }
        else if (rainValue < 2.5) {
            return "Light";
        } else if (rainValue <= 7.5) {
            return "Moderate";
        } else if (rainValue <= 15) {
            return "Heavy";
        } else if (rainValue <= 30) {
            return "Intense";
        } else if (rainValue > 30) {
            return "Torrential";
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
                        src={rain}
                        alt="image"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',

                        }}
                    />


                </Box>
            </Dialog>
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={isMobile ? '5px' : '0px'} marginTop={isMobile ? '5px' : '5px'}>
                <Box display="flex" flexDirection="row" >
                    <Typography variant={isMobile ? 'body2' : 'h6'} fontWeight="500">
                        Rain Fall
                    </Typography>
                    <Box marginLeft={isMobile ? '20px' : '40px'}> 
                        <img src={rainIcon} alt="Image2" width={isMobile ? '12px' : '20px'} /> 
                    </Box>
                </Box>
                <Typography variant={isMobile ? 'body1' : 'h4'} marginTop={isMobile ? '5px' : '10px'}> 
                    {rainData ? (
                        <div>
                            {rainData.map(function (a) {
                                return <div key={a.id}>{a.data.rain_fall.value} mm</div>
                            })}
                        </div>
                    ) : error ? (
                        <>Rain...</>
                    ) : (
                        <>Rain...</>
                    )}
                </Typography>
                <Typography variant={isMobile ? 'body2' : 'body1'} marginBottom={isMobile ? '5px' : '15px'}> 
                    {rainData ? (
                        <div>{rainWord(rainData[0].data.rain_fall.value)}</div>
                    ) : (
                        <>Rain...</>
                    )}
                </Typography>
            </Box>
        </Box>
    );
}

export default FBRainInfo;