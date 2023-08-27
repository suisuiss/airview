import React from 'react';
import AqiInfo from './AQI/aqiInfo';
import CurrentDate from './currentDateTime/date';
import CurrentTime from './currentDateTime/time';
import LGHumidityInfo from './emrontech/learningGarden/humidity';
import LGStation from './emrontech/learningGarden/station';
import WeatherForecastInfo from './weather/weatherInfo';
import Box from '@mui/material/Box';
import LGHumidityInfoTest from './emrontech/learningGarden/humidityTest';




function App() {
  return (

    <div className="App">
      <Box display="flex" flexDirection="column" >
        <AqiInfo />
        {/* <CurrentDate />
      <CurrentTime />
      
      <LGStation />
      <WeatherForecastInfo /> */}
        <Box display="flex" flexDirection="row">
          <LGHumidityInfo />
          {/* <Box bgcolor="#FFFF" width='215px' marginLeft='15px' borderRadius='25px' marginTop='20px'>
            
          </Box> */}
          <LGHumidityInfoTest/>
        </Box>
      </Box>
    </div>



  );
}

export default App;
