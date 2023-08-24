import React from 'react';
import AqiInfo from './AQI/aqiInfo';
import CurrentDate from './currentDateTime/date';
import CurrentTime from './currentDateTime/time';
import LGHumidityInfo from './emrontech/learningGarden/humidity';
import LGStation from './emrontech/learningGarden/station';
import WeatherForecastInfo from './weather/weatherInfo';





function App() {
  return (

    <div className="App">
      <AqiInfo />
      {/* <CurrentDate />
      <CurrentTime />
      
      <LGStation />
      <WeatherForecastInfo /> */}
      {/* <LGHumidityInfo /> */}

    </div>


  );
}

export default App;
