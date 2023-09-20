import React, { useState } from 'react';
import './AnalDesk.css'
import AqiInfo from '../AQI/aqiInfo'
import Pm25Info from '../emrontech/pm25';
import Pm10Info from '../emrontech/pm10';
import OverallInfo from '../emrontech/overallinfo';
const AnalDesk = () => {
  const [locations, setLocation] = useState("LearningGarden");
  const setLearningGarden = () => {
    setLocation("LearningGarden");
  }
  const setFibo = () => {
    setLocation("FIBO");
  }

  return (
    <div>
      <div className='NavBarContainer'> {/* NavBarContainer for Navbar */}
        <div>PlaceHolder for Navbar</div>
      </div>

      <div className='StationButtonContainer'> {/* Button for choosing station graph */}
        <button className={locations === 'LearningGarden' ? 'StationButton' : 'StationButton StationButtonContainerNA'} onClick={setLearningGarden}>
          Learning Garden
        </button>
        <button className={locations === 'FIBO' ? 'StationButton' : 'StationButton StationButtonContainerNA'} onClick={setFibo}>
          FIBO
        </button>
      </div>

      <div className='GraphAndInfoContainer'>
        <div className="grid-item item1"> {/*GRID NUMBER 1*/}
          <div style={{fontSize: '40px', lineHeight: '1.4' }}>
            <AqiInfo/>
          </div>
          <div style={{fontSize: '25px'}}>
            <Pm25Info location={locations}/> <Pm10Info location={locations}/>
          </div>
        </div>
        <div className="grid-item item2">
          <div style={{fontSize: '25px', textAlign: 'left'}}>
            <OverallInfo location={locations}/>
          </div>
        </div>
        <div className="grid-item item3">3</div>
      </div>
    </div>
  )
}

export default AnalDesk;