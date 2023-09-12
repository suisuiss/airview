import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import FullscreenIcon from '../assetIcon/tdesign_fullscreen-2.png';
import LGFullscreenContent from './content/LGfull';
import LGNormalContent from './content/LGnormal';

function LGDashboard() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const iconStyle = {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    };

    const enterFullscreen = () => {
        const element = document.documentElement;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

        setIsFullscreen(true);
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        setIsFullscreen(false);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {

                setIsFullscreen(true);
            } else {

                setIsFullscreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    return (
        <Box>
            {!isFullscreen && (
                <Box style={iconStyle}>
                    <IconButton onClick={toggleFullscreen}>
                        <img src={FullscreenIcon} alt="Fullscreen Icon" width="40px" />
                    </IconButton>
                </Box>
            )}
            {isFullscreen ? <LGFullscreenContent /> : <LGNormalContent />}
        </Box>
    );
}

export default LGDashboard;
