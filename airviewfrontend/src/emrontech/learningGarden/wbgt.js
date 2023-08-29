import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import wbgtIcon from '../../assetIcon/WBGT.png';

function LGWBGTInfo() {
    const [wbgtData, setWbgtData] = useState(null);
    const [error, setError] = useState(null);
    const fetchDataWithRetry = () => {
        const delayBetweenRequests = 5000; // 5 seconds

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
                    fetchDataWithRetry();
                }, delayBetweenRequests);
            });
    };

    const wbgtWord = (wbgtValue) => {
        if (wbgtValue < 25) {
            return "Comfortable";
        }
        else if (wbgtValue <=29.9 ) {
            return "Moderate";
        } else if (wbgtValue <= 34.9) {
            return "Uncomfortable";
        } else if (wbgtValue > 35) {
            return "Severe";
        }
    }

    useEffect(() => {
        fetchDataWithRetry(); // Initial fetch
    }, []);

    return (
        <Box width="220px" bgcolor="#FFFF" borderRadius="25px" marginTop='20px' marginLeft='20px' display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" paddingTop='10px' paddingLeft='20px' alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="center" marginBottom='15px'>
                    <Box display="flex" flexDirection="row" >
                        <Typography variant="h6" fontWeight="500">
                            WBGT
                        </Typography>
                        <Box marginLeft="95px">
                            <img src={wbgtIcon} alt="Image2" width='20px' />
                        </Box>
                    </Box>
                    <Typography variant="h5" marginTop="10px">
                        {wbgtData ? (<div>
                            {wbgtData.map(function (a) {
                                return <div key={a.id}>
                                    {a.data.wbgt.value} °C
                                </div>
                            })}
                        </div>) : error ? (
                            <p>WBGT...</p>
                        ) :
                            (
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
        </Box>
    );

}



export default LGWBGTInfo;