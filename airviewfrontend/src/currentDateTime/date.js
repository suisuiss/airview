import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

function CurrentDate() {
    const [date, setDate] = useState(new Date());
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const dayOfMonth = date.getUTCDate();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const bangkokOffset = 7 * 60 * 60 * 1000;
            const bangkokTime = new Date(now.getTime() + bangkokOffset);
            setDate(bangkokTime);
        };


        const now = new Date();
        const bangkokOffset = 7 * 60 * 60 * 1000; 
        const midnightBangkok = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, 
            0, 
            0, 
            0,
            0
        );
        const millisecondsUntilMidnight = midnightBangkok.getTime() - (now.getTime() + bangkokOffset);

        updateDate();

        const intervalId = setInterval(updateDate, millisecondsUntilMidnight);

        
        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;

    return (
        <Box>
            {formattedDate}
        </Box>
    );
}

export default CurrentDate;