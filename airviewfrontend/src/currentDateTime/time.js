import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

function CurrentTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Function to update the time every minute
        const updateTime = () => {
            const now = new Date();
            // Adjust the time zone offset for Bangkok (UTC+7)
            const bangkokTime = new Date(now.getTime());
            setTime(bangkokTime);
        };

        // Initial call to set the time
        updateTime();

        // Set up an interval to update the time every minute
        const intervalId = setInterval(updateTime, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Format the date and time as a string
    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Bangkok', // Set the time zone to Bangkok
    });

    return (
        <Box>
            {formattedTime}
            
        </Box>
    );
}

export default CurrentTime;