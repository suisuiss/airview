import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LGDashboard from './dashboard/LGdashboard';
import FBDashboard from './dashboard/FBdashboard';
import FBFull from './fullscreen/fbfull';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LGDashboard />} />
        <Route path="fbdashboard" element={<FBDashboard />} />
        <Route path="fbfull" element={<FBFull />} />
      </Routes>
    </Router>
  );
}

export default App;
