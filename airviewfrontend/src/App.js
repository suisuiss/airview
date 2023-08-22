import React from 'react';
import AqiInfo from './AQI/aqiInfo';
import CurrentDate from './currentDateTime/date';
import CurrentTime from './currentDateTime/time';
import LGHumidityInfo from './emrontech/learningGarden/humidity';
import LGStation from './emrontech/learningGarden/station';
import WeatherForecastInfo from './weather/weatherInfo';
import AqiCircle from './AQI/aqiCircle';
import AqiWord from './AQI/aqiWord';




function App() {
  return (

    <div className="App">
      <AqiInfo />
      <CurrentDate />
      <CurrentTime />
      <LGHumidityInfo />
      <LGStation />
      <WeatherForecastInfo />
      <AqiCircle/>
      <AqiWord/>

    </div>


  );
}

export default App;
