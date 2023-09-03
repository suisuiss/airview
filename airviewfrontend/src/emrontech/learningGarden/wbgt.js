import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import wbgtIcon from '../../assetIcon/WBGT.png';

function LGWBGTInfo() {
    const [wbgtData, setWbgtData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        const delayBetweenRequests = 300000; // 5 minutes in milliseconds

        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "1");
                setWbgtData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching WBGT data:', error);
                setError(error);

                // Retry the request after a delay
                setTimeout(() => {
                    fetchData();
                }, delayBetweenRequests);
            });
    };

    const wbgtWord = (wbgtValue) => {
        if (wbgtValue < 25) {
            return "Comfortable";
        }
        else if (wbgtValue <= 29.9) {
            return "Moderate";
        } else if (wbgtValue <= 34.9) {
            return "Uncomfortable";
        } else if (wbgtValue > 35) {
            return "Severe";
        }
    }

    useEffect(() => {
        fetchData(); // Initial fetch

        // Fetch data every 5 minutes (300,000 milliseconds)
        const intervalId = setInterval(fetchData, 300000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box
            height="165px"
            width="260px"
            bgcolor="#FFFF"
            borderRadius="25px"
            marginTop='10px'
            marginLeft='20px'
            display="flex"
            flexDirection="column"
            alignItems="center" // Center content horizontally
            justifyContent="center" // Center content vertically
        >
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom='15px' marginTop='15px'>
                <Box display="flex" flexDirection="row" >
                    <Typography variant="h5" fontWeight="500">
                        WBGT
                    </Typography>
                    <Box marginLeft="95px">
                        <img src={wbgtIcon} alt="Image2" width='30px' />
                    </Box>
                </Box>
                <Typography variant="h4" marginTop="10px">
                    {wbgtData ? (
                        <div>
                            {wbgtData.map(function (a) {
                                return <div key={a.id}>
                                    {a.data.wbgt.value} °C
                                </div>
                            })}
                        </div>
                    ) : error ? (
                        <p>WBGT...</p>
                    ) : (
                        <p>WBGT...</p>
                    )}
                </Typography>
                <Typography variant="h7" marginBottom="10px">
                    {wbgtData ? (
                        <div>
                            {wbgtWord(wbgtData[0].data.wbgt.value)}
                        </div>
                    ) : (
                        <p>WBGT...</p>
                    )}
                </Typography>
              
            </Box>
        </Box>
    );
}

export default LGWBGTInfo;
