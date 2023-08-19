import React from 'react';
import WeatherInfo from './weather/weatherInfo';
import AqiInfo from './AQI/aqiInfo';
import HumidityInfo from './emrontech/humidity';

function App() {
  return (
    <div className="App">
      <AqiInfo />
      <HumidityInfo/>
      <WeatherInfo />
    </div>
  );
}

export default App;
