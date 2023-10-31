import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

function CurrentTime() {
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const bangkokTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
            const options = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Bangkok',
            };
            const formattedBangkokTime = bangkokTime.toLocaleString('en-US', options);
            setFormattedTime(formattedBangkokTime);
        };

        updateTime(); 

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box>
            {formattedTime}
        </Box>
    );
}

export default CurrentTime;
