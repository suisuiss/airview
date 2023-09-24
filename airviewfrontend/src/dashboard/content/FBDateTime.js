import React from 'react';
import { Box, Typography } from '@mui/material';
import CurrentTime from '../../currentDateTime/time';
import CurrentDate from '../../currentDateTime/date';

function FiboDateTime() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" marginLeft="10px" marginBottom="10px">
            <Typography variant='h3' fontWeight="600" color="#363E64" >
                <CurrentTime />
            </Typography>
            <Typography variant='h5' color="#363E64">
                <CurrentDate />
            </Typography>
        </Box>
    );
}

export default FiboDateTime;
