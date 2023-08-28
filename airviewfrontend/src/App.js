import React from 'react';
import AqiInfo from './AQI/aqiInfo';
import LGHumidityInfo from './emrontech/learningGarden/humidity';
import Box from '@mui/material/Box';
import LGHumidityInfoTest from './emrontech/learningGarden/rainfall';




function App() {
  return (

    <div className="App">
      <Box display="flex" flexDirection="column">
        <AqiInfo />
        <Box display="flex" flexDirection="row" > {/* Extend to full width */}
          <LGHumidityInfo /> {/* Adjust width as needed */}
          <LGHumidityInfoTest /> {/* Adjust width as needed */}
        </Box>
        <Box display="flex" flexDirection="row"> {/* Extend to full width */}
          <LGHumidityInfo /> {/* Adjust width as needed */}
          <LGHumidityInfoTest /> {/* Adjust width as needed */}
        </Box>
      </Box>
    </div>



  );
}

export default App;
