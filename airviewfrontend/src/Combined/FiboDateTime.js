import { Box, Typography } from '@mui/material';
import React from 'react';
import CurrentTime from '../currentDateTime/time';
import CurrentDate from '../currentDateTime/date';
import FBLocation from './FBLocation';


function FiboDateTime() {
    return (
        <Box display="flex" flexDirection="row"   >
            <FBLocation />
            <Box display="flex" flexDirection="column" alignItems="flex-end" marginLeft="10px" >
                <Typography variant='h3' fontWeight="600" color="#363E64">
                    <CurrentTime />
                </Typography>
                <Typography variant='h5' color="#363E64" >
                    <CurrentDate /></Typography>
            </Box>
        </Box>
    );
}

export default FiboDateTime;

