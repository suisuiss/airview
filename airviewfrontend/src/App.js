import React from 'react';
import AqiInfo from './AQI/aqiInfo';
import LGHumidityInfo from './emrontech/learningGarden/humidity';
import Box from '@mui/material/Box';
import LGRainInfo from './emrontech/learningGarden/rainfall';
import LGWBGTInfo from './emrontech/learningGarden/wbgt';
import LGWindInfo from './emrontech/learningGarden/windspeed';




function App() {
  return (

    <div className="App">
      <Box display="flex" flexDirection="column">
        <AqiInfo />
        <Box display="flex" flexDirection="row" > 
          <LGHumidityInfo /> 
          <LGRainInfo />
        </Box>
        <Box display="flex" flexDirection="row"> 
          <LGWBGTInfo /> 
          <LGWindInfo/> 
        </Box>
      </Box>
    </div>



  );
}

export default App;
