import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'
import { createRoot } from 'react-dom/client'; 

const root = createRoot(document.getElementById('root'));
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
