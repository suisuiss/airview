import React from 'react';
import AqiInfo from './AQI/aqiInfo';
import LGHumidityInfo from './emrontech/learningGarden/humidity';
import Box from '@mui/material/Box';
import LGRainInfo from './emrontech/learningGarden/rainfall';
import LGWBGTInfo from './emrontech/learningGarden/wbgt';
import LGWindInfo from './emrontech/learningGarden/windspeed';
import LGDateTime from './Combined/LGDateTime';
import Faq from './faq'
import Noti from './noti';




function App() {
  return (

    <div className="App">
      {/* <Box display="flex" flexDirection="column">
        <AqiInfo />
        <Box color="#363E64"> 
          <LGHumidityInfo /> 
          <LGRainInfo />
        </Box>
        <Box display="flex" flexDirection="row"> 
          <LGWBGTInfo /> 
          <LGWindInfo/> 
        </Box>
      </Box> */}
      {/* <LGDateTime/> */}

      <Noti/>
    </div>



  );
}

export default App;
