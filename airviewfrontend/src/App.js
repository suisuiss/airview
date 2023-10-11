import React, { useState } from 'react';
import AqiInfo from './AQI/aqiInfo';
import LGHumidityInfo from './emrontech/learningGarden/humidity';
import Box from '@mui/material/Box';
import LGRainInfo from './emrontech/learningGarden/rainfall';
import LGWBGTInfo from './emrontech/learningGarden/wbgt';
import LGWindInfo from './emrontech/learningGarden/windspeed';
import LGDateTime from './Combined/LGDateTime';
import Faq from './faq'
import Noti from './noti';
import Select from './select';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LGDashboard from './dashboard/LGdashboard';
import FBDashboard from './dashboard/FBdashboard';
import FBFullscreenContent from './dashboard/content/FBfull';
import LGFullscreenContent from './dashboard/content/LGfull';
import Nav from './navbar';

function App() {
  const[ isFullscreen ,  setIsFullscreen] = useState(false);
  return (
    
    <Router>
      {isFullscreen ? null : <Nav />}
      <Routes>
        <Route path="/" element={<LGDashboard isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen}/>} />
        <Route path="fbdashboard" element={<FBDashboard isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen}/>} />
        <Route path="/notification" element={<Noti/>} />
        <Route path="/faq" element={<Faq />} />
        
      </Routes>
    </Router>
  );
}

export default App;