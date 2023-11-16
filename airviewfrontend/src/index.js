import React, { useState, useEffect } from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'
import { createRoot } from 'react-dom/client'; 

const root = createRoot(document.getElementById('root'));

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js')
//     .then((registration) => {
//       console.log('(from index.js)Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.warn('(from index.js)Service Worker registration failed:', error);
//     });
// }
const AppContainer = () => {
  const [backgroundColor, setBackgroundColor] = useState(getBackgroundColor());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundColor(getBackgroundColor());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  function getBackgroundColor() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 16) {
      // Day
      return 'linear-gradient(rgba(236, 189, 168, 1), rgba(191, 187, 239, 1))'; // Yellow
    } else if (currentHour >= 16 && currentHour < 19) {
      // Evening
      return `linear-gradient(rgba(236, 189, 168, 1), rgba(191, 187, 239, 1))`; // Sky Blue
    } else {
      // Night (Gradient)
      return `linear-gradient(rgba(132, 169, 224, 1), rgba(53, 47, 71, 1))`;
    }
  }

  document.body.style.backgroundImage = backgroundColor;

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(<AppContainer />);


reportWebVitals();
