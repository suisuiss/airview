import React from 'react';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '../assetIcon/tdesign_fullscreen-2.png';
import { Box } from '@mui/material';

function Header() {
    const iconStyle = {
        position: 'fixed', 
        top: '10px',
        right: '10px', 
        zIndex: 1000, 
    };

    return (
        <Box style={iconStyle}>
            <IconButton>
                <img src={FullscreenIcon} alt="Fullscreen Icon" width="40px" />
            </IconButton>
        </Box>
    );
}

export default Header;
