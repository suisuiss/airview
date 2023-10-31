import React, { useState } from 'react';
import Faq from './faq'
import Noti from './noti';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LGDashboard from './dashboard/LGdashboard';
import FBDashboard from './dashboard/FBdashboard';
import Nav from './navbar';
import AnalDesk from './DesktopAnalytics/AnalDesk';

function App() {
  const[ isFullscreen ,  setIsFullscreen] = useState(false);
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/public/sw.js')
  //       .then((registration) => {
  //         console.log('Service Worker registered with scope:', registration.scope);
  //       })
  //       .catch((error) => {
  //         // console.log('Service Worker registration failed:', error);
  //       });
  //   }
  // }, []);
  
  return (
    
    <Router>
      {isFullscreen ? null : <Nav />}
      <Routes>
        <Route path="/" element={<LGDashboard isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen}/>} />
        <Route path="fbdashboard" element={<FBDashboard isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen}/>} />
        <Route path="/notification" element={<Noti/>} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/analytic" element={<AnalDesk/>} />
      </Routes>
    </Router>
  );
}

export default App;