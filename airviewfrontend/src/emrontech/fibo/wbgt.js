import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import wbgtIcon from '../../assetIcon/WBGT.png';

function FBWBGTInfo() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const [wbgtData, setWbgtData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        const delayBetweenRequests = 300000;

        fetch('https://asia-southeast1-hypnotic-spider-397306.cloudfunctions.net/function-2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.filter((item) => item.id === "2");
                setWbgtData(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching WBGT data:', error);
                setError(error);

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
        fetchData();

        const intervalId = setInterval(fetchData, 300000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box
            height={isMobile ? '110px' : '165px'} 
            width={isMobile ? '170px' : '260px'}
            bgcolor="#FFFF"
            borderRadius="25px"
            marginTop={isMobile ? '5px' : '10px'} 
            marginLeft={isMobile ? '0px' : '20px'} 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={isMobile ? '5px' : '10px'} marginTop={isMobile ? '5px' : '10px'}>
                <Box display="flex" flexDirection="row" >
                    <Typography variant={isMobile ? 'body2' : 'h6'} fontWeight="500"> 
                        WBGT
                    </Typography>
                    <Box marginLeft={isMobile ? '20px' : '40px'}> 
                        <img src={wbgtIcon} alt="Image2" width={isMobile ? '12px' : '30px'} />
                    </Box>
                </Box>
                <Typography variant={isMobile ? 'body1' : 'h4'} marginTop={isMobile ? '5px' : '10px'}>
                    {wbgtData ? (
                        <div>
                            {wbgtData.map(function (a) {
                                return <div key={a.id}>{a.data.wbgt.value} °C</div>
                            })}
                        </div>
                    ) : error ? (
                        <>WBGT...</>
                    ) : (
                        <>WBGT...</>
                    )}
                </Typography>
                <Typography variant={isMobile ? 'body2' : 'body1'} marginBottom={isMobile ? '5px' : '10px'}> 
                    {wbgtData ? (
                        <div>
                            {wbgtWord(wbgtData[0].data.wbgt.value)}
                        </div>
                    ) : (
                        <>WBGT...</>
                    )}
                </Typography>
            </Box>
        </Box>
    );
}

export default FBWBGTInfo;