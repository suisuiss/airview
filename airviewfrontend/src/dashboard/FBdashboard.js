import React, { useState, useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import FullscreenIcon from '../assetIcon/tdesign_fullscreen-2.png';
import FullscreenContent from './content/FBfull';
import NormalContent from './content/FBnormal';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function FBDashboard({isFullscreen , setIsFullscreen}) {
    // const [isFullscreen, setIsFullscreen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

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

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
            {isMobile ? (
                <Box style={iconStyle}>
                    {/* <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton> */}
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Menu Item 1</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Menu Item 2</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Menu Item 3</MenuItem>
                    </Menu>
                </Box>
            ) : (
                !isFullscreen && (
                    <Box style={iconStyle}>
                        <IconButton onClick={toggleFullscreen}>
                            <img src={FullscreenIcon} alt="Fullscreen Icon" width="40px" />
                        </IconButton>
                    </Box>
                )
            )}
            {isFullscreen ? <FullscreenContent /> : <NormalContent />}
        </Box>
    );
}

export default FBDashboard;
