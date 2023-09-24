import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LGStation from '../../emrontech/learningGarden/station';
import FiboStation from '../../emrontech/fibo/station';
import FBFullscreenContent from './FBfull';
import LGFullscreenContent from './LGfull';

function LGLocation() {
    const [selectedStation, setSelectedStation] = useState('LGStation');
    const [selectedTime, setSelectedTime] = useState('none');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const navigate = useNavigate();

    const handleChangeStation = (event) => {
        setSelectedStation(event.target.value);
        if (event.target.value === 'LGStation') {
            navigate('/');
        } else if (event.target.value === 'FiboStation') {
            navigate('/fbdashboard');
        }
    };

    const handleChangeTime = (event) => {
        setSelectedTime(event.target.value);
        if (event.target.value === '10mins') {
            toggleFullScreen();
        }
        else if (event.target.value === '20mins') {
            toggleFullScreen();
        }
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.log(err.message);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        if (isFullScreen) {
            document.addEventListener('fullscreenchange', handleFullScreenChange);
        } else {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        }

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [isFullScreen]);

    useEffect(() => {
        let switchingIntervalId;
        if (selectedTime === '10mins' && isFullScreen) {
            switchingIntervalId = setInterval(() => {
                setIsSwitching((prevIsSwitching) => !prevIsSwitching);
            }, 600000);

            console.log("isSwitching toggled to:", isSwitching);

            return () => {
                clearInterval(switchingIntervalId);
            };
        } else if (selectedTime === '20mins' && isFullScreen) {
            switchingIntervalId = setInterval(() => {
                setIsSwitching((prevIsSwitching) => !prevIsSwitching);
            }, 600000 * 2);

            console.log("isSwitching toggled to:", isSwitching);

            return () => {
                clearInterval(switchingIntervalId);
            };
        }
    }, [selectedTime, isFullScreen]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
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
                </Select>
            </FormControl>

            <Box
                borderRadius="25px"
                paddingTop="10px"
                paddingLeft="30px"
                width="100%"
                margin="0 auto"
            >
                <Typography variant="h5" fontWeight="600" color="#363E64">
                    KMUTT, Bangkok
                </Typography>
                <Box mt={2}></Box>
            </Box>
            {selectedTime === '10mins' ? (
                isSwitching ? <LGFullscreenContent /> : <FBFullscreenContent />
            ) : null}
        </Box>
    );
}

export default LGLocation;
