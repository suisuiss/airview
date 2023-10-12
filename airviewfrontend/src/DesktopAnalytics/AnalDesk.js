import React, { useState } from 'react';
import './AnalDesk.css'
import AqiInfoAnal from '../AQI/aqiInfoAnal';
import Pm25Info from '../emrontech/pm25';
import Pm10Info from '../emrontech/pm10';
import OverallInfo from '../emrontech/overallinfo';
import OverallInfo2 from '../emrontech/overallinfo2';
import Graph from '../Graph/Graph';

const AnalDesk = () => {
    const [locations, setLocation] = useState("LearningGarden");
    const isMobile = window.innerWidth < 766;

  const setLearningGarden = () => {
    setLocation("LearningGarden");
  }
  const setFibo = () => {
    setLocation("FIBO");
  }

  return (
    <div>
      <div className='StationButtonContainer'> {/* Button for choosing station graph */}
        {isMobile && 
          <div className={locations === 'LearningGarden' ? 'MovingButton' : 'MovingButton GoRight'}></div>
        }
        <button className={locations === 'LearningGarden' ? 'StationButton' : 'StationButton StationButtonContainerNA'} onClick={setLearningGarden}>
          Learning Garden
        </button>
        <button className={locations === 'FIBO' ? 'StationButton' : 'StationButton StationButtonContainerNA'} onClick={setFibo}>
          FIBO
        </button>
      </div>

      <div className='GraphAndInfoContainer'>
        <div className="grid-item item1"> {/*GRID NUMBER 1*/}
          <div className="aqiInfo">
            <AqiInfoAnal />
          </div>
          <div className="pmInfo">
            <Pm25Info location={locations}/> <Pm10Info location={locations}/>
          </div>
        </div>
        <div className="grid-item item2"> {/*GRID NUMBER 2*/}
          <div className="overAllInfo">
            <OverallInfo location={locations}/>
            <div style={{width:"10%"}}></div>
            <OverallInfo2 location={locations}/>
          </div>
        </div>
        <div className="grid-item item3">
          <Graph />
        </div> {/*GRID NUMBER 3*/}
      </div>
    </div>
  )
}

export default AnalDesk;