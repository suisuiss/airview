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
        // Function to update the date and time every midnight (GMT+7)
        const updateDate = () => {
            const now = new Date();
            // Adjust the time zone offset for Bangkok (GMT+7)
            const bangkokOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
            const bangkokTime = new Date(now.getTime() + bangkokOffset);
            setDate(bangkokTime);
        };

        // Calculate the milliseconds until the next midnight in Bangkok
        const now = new Date();
        const bangkokOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
        const midnightBangkok = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, // Next day at midnight
            0, // Hours
            0, // Minutes
            0, // Seconds
            0 // Milliseconds
        );
        const millisecondsUntilMidnight = midnightBangkok.getTime() - (now.getTime() + bangkokOffset);

        // Initial call to set the date and time
        updateDate();

        // Set up an interval to update the date at midnight in Bangkok
        const intervalId = setInterval(updateDate, millisecondsUntilMidnight);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Format the date and time as a string
    const formattedDate = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;

    return (
        <Box>
            {formattedDate}
        </Box>
    );
}

export default CurrentDate;