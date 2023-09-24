import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LGDashboard from './dashboard/LGdashboard';
import FBDashboard from './dashboard/FBdashboard';
import FBFullscreenContent from './dashboard/content/FBfull';
import LGFullscreenContent from './dashboard/content/LGfull';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LGDashboard />} />
        <Route path="fbdashboard" element={<FBDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
