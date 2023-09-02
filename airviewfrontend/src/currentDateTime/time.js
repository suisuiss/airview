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
                hour12: true, // Use AM/PM format
                timeZone: 'Asia/Bangkok',
            };
            const formattedBangkokTime = bangkokTime.toLocaleString('en-US', options);
            setFormattedTime(formattedBangkokTime);
        };

        updateTime(); // Initial call to set the time

        // Set up an interval to update the time every second for more accurate updates
        const intervalId = setInterval(updateTime, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box>
            {formattedTime}
        </Box>
    );
}

export default CurrentTime;
