import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import LGStation from '../emrontech/learningGarden/station';
import FiboStation from '../emrontech/fibo/station';

function LGLocation() {
    const [selectedStation, setSelectedStation] = useState('LGStation');
    const [selectedTime, setSelectedTime] = useState('10mins');
    

    const handleChangeStation = (event) => {
        setSelectedStation(event.target.value);

        
    };

    const handleChangeTime = (event) => {
        setSelectedTime(event.target.value);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            
            width="280px" /* Adjust the width as needed */
        >
            <FormControl variant="outlined" fullWidth>
                <Select
                    value={selectedStation}
                    onChange={handleChangeStation}
                    style={{ borderRadius: '25px', backgroundColor: "#F0F5FF", height:'45px'}}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                borderRadius: '15px',
                                backgroundColor: '#F0F5FF' // Apply border radius to the menu
                            },
                        },
                    }}
                >
                    <MenuItem value="LGStation"> <Typography variant="h5" fontWeight="600" color="#363E64"><LGStation/></Typography></MenuItem>
                    <MenuItem value="FiboStation"><Typography variant="h5" fontWeight="600" color="#363E64"><FiboStation/></Typography></MenuItem>
                    <Grid container alignItems="center">
                        <Grid item>
                            <MenuItem value="Switch"><Typography variant="h7" color="#363E64" fontWeight="600">Switch Location</Typography></MenuItem>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <Select
                                    value={selectedTime}
                                    onChange={handleChangeTime}
                                    style={{ borderRadius: '25px', backgroundColor: "#FFFFF" }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                borderRadius: '15px',
                                                backgroundColor: '#FFFFF' // Apply border radius to the menu
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="10mins"><Typography variant="h7" color="#363E64" fontWeight="600">every 10 mins</Typography></MenuItem>
                                    <MenuItem value="20mins"><Typography variant="h7" color="#363E64" fontWeight="600">every 20 mins</Typography></MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>


                </Select>
            </FormControl>

            <Box
                borderRadius="25px"
                paddingTop="10px"
paddingLeft="30px"
                width="100%" /* Adjust the width as needed */
            >
                <Typography variant="h5" fontWeight="600" color="#363E64">KMUTT, Bangkok</Typography>
                <Box mt={2}>
                    {/* {selectedTime === '10mins' && (
                        <>
                            every 10 mins
                        </>
                    )}
                    {selectedTime === '20mins' && (
                        <>
                            every 20 mins
                        </>
                    )} */}
                </Box>
                
            </Box>
        </Box>
    );
}

export default LGLocation;
