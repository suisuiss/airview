import React, { useState, useEffect } from 'react';
import Faq from './faq'
import Noti from './noti';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LGDashboard from './dashboard/LGdashboard';
import FBDashboard from './dashboard/FBdashboard';
import Nav from './navbar';
import AnalDesk from './DesktopAnalytics/AnalDesk';

function App() {
  const[ isFullscreen ,  setIsFullscreen] = useState(false);
  const [isSub, setIsSub] = useState(() => {
    const storedIsSub = localStorage.getItem('isSub');
    return storedIsSub !== null ? JSON.parse(storedIsSub) : false;
  });
  // Handle changes to isSub
  useEffect(() => {
    localStorage.setItem('isSub', JSON.stringify(isSub));
  }, [isSub]);


  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
  //     .then((registration) => {
  //       console.log('(from App.js)Service Worker registered with scope:', registration.scope);
  //     })
  //     .catch((error) => {
  //       console.warn('(from App.js)Service Worker registration failed:', error);
  //     });
  //   }
  // }, []);
  console.log("Global isSub = " + isSub)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('Logging every 2 seconds');
  //   }, 2000);

  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, []);
  return (
    
    <Router>
      {isFullscreen ? null : <Nav />}
      <Routes>
        <Route path="/" element={<LGDashboard isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen}/>} />
        <Route path="fbdashboard" element={<FBDashboard isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen}/>} />
        <Route path="/notification" element={<Noti isSub={isSub} setIsSub={setIsSub}/>} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/analytic" element={<AnalDesk/>} />
      </Routes>
    </Router>
  );
}

export default App;