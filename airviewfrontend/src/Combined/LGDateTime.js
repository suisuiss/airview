import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import LGLocation from './LGLocation';
import CurrentTime from '../currentDateTime/time';
import CurrentDate from '../currentDateTime/date';


function LGDateTime() {


    return (
        <Box display="flex" flexDirection="row" marginTop="30px" marginLeft="30px" >
            <LGLocation />
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

export default LGDateTime;

