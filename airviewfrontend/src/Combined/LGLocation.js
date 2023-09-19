import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import LGStation from '../emrontech/learningGarden/station';
import FiboStation from '../emrontech/fibo/station';
import { useNavigate } from 'react-router-dom';
import FBFullscreenContent from '../dashboard/content/FBfull';
import LGFullscreenContent from '../dashboard/content/LGfull';

function LGLocation() {
    const [selectedStation, setSelectedStation] = useState('LGStation');
    const [selectedTime, setSelectedTime] = useState('none');
    const navigate = useNavigate();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [content, setContent] = useState(<LGFullscreenContent />);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.log(err.message);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleChangeStation = (event) => {
        setSelectedStation(event.target.value);
        if (event.target.value === 'FiboStation') {
            navigate('/fbdashboard');
        } else if (event.target.value === 'LGStation') {
            navigate('/');
        }
    };

    const handleChangeTime = (event) => {
        setSelectedTime(event.target.value);
    };

    useEffect(() => {
        if (selectedTime === '10mins') {
            toggleFullScreen();
            setIsFullScreen(true);
            const contentSwitchInterval = setInterval(() => {
                setContent((prevContent) =>
                    prevContent === <FBFullscreenContent /> ? <LGFullscreenContent /> : <FBFullscreenContent />
                );
            }, 5000); // Switch content every 5 seconds
            return () => {
                clearInterval(contentSwitchInterval);
            };
        } else {
            setIsFullScreen(false);
        }
    }, [selectedTime]);

    useEffect(() => {
        if (isFullScreen) {
            document.addEventListener('fullscreenchange', handleFullScreenChange);
        } else {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        }
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [isFullScreen]);

    const handleFullScreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="270px"
        >
            <FormControl variant="outlined" fullWidth>
                <Select
                    value={selectedStation}
                    onChange={handleChangeStation}
                    style={{
                        borderRadius: '25px',
                        backgroundColor: '#F0F5FF',
                        height: '45px',
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                borderRadius: '15px',
                                backgroundColor: '#F0F5FF',
                            },
                        },
                    }}
                >
                    <MenuItem value="LGStation">
                        <Typography variant="h5" fontWeight="600" color="#363E64">
                            <LGStation />
                        </Typography>
                    </MenuItem>
                    <MenuItem value="FiboStation">
                        <Typography variant="h5" fontWeight="600" color="#363E64">
                            <FiboStation />
                        </Typography>
                    </MenuItem>
                    <Grid container alignItems="center">
                        <Grid item>
                            <MenuItem value="Switch">
                                <Typography
                                    variant="h7"
                                    color="#363E64"
                                    fontWeight="600"
                                >
                                    Switch Location
                                </Typography>
                            </MenuItem>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <Select
                                    value={selectedTime}
                                    onChange={handleChangeTime}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: '#FFFFF',
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                borderRadius: '15px',
                                                backgroundColor: '#FFFFF',
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="none">
                                        <Typography
                                            variant="h7"
                                            color="#363E64"
                                            fontWeight="600"
                                        >
                                            None
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value="10mins">
                                        <Typography
                                            variant="h7"
                                            color="#363E64"
                                            fontWeight="600"
                                        >
                                            every 10 mins
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value="20mins">
                                        <Typography
                                            variant="h7"
                                            color="#363E64"
                                            fontWeight="600"
                                        >
                                            every 20 mins
                                        </Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Select>
            </FormControl>

            <Box
                borderRadius="25px"
                paddingTop="10px"
                paddingLeft="30px"
                width="100%"
            >
                <Typography variant="h5" fontWeight="600" color="#363E64">
                    KMUTT, Bangkok
                </Typography>
                <Box mt={2}></Box>
            </Box>

            {/* Conditional rendering of content based on fullscreen mode */}
            {isFullScreen && content}
        </Box>
    );
}

export default LGLocation;
