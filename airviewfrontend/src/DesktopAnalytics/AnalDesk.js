import React, { useState } from 'react';
import './AnalDesk.css'
import AqiInfo from '../AQI/aqiInfo'
import Pm25Info from '../emrontech/pm25';
import Pm10Info from '../emrontech/pm10';
import OverallInfo from '../emrontech/overallinfo';
import threeDots from '../Assets/3DotsVertical.png'
const AnalDesk = () => {
  const [locations, setLocation] = useState("LearningGarden");
  const setLearningGarden = () => {
    setLocation("LearningGarden");
  }
  const setFibo = () => {
    setLocation("FIBO");
  }
  const isMobile = window.innerWidth < 766;

  return (
    <div>
      <div className='NavBarContainer'> {/* NavBarContainer for Navbar */}
        {!isMobile ? (<div>PlaceHolder for Navbar</div>) : (<div className='MenuContainer'> <img src={threeDots} alt="threeDots" style={{width:"25px"}}/></div>)}
      </div>

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
            <AqiInfo/>
          </div>
          <div className="pmInfo">
            <Pm25Info location={locations}/> <Pm10Info location={locations}/>
          </div>
        </div>
        <div className="grid-item item2">
          <div className="overAllInfo">
            <OverallInfo location={locations}/>
          </div>
        </div>
        <div className="grid-item item3">3</div>
      </div>
    </div>
  )
}

export default AnalDesk;