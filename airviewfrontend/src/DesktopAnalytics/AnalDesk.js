import React, { useState } from 'react';
import './AnalDesk.css'
const AnalDesk = () => {
  const [isActive, setIsActive] = useState("LearningGarden");

  return (
    <div>
      <div className='NavBarContainer'> {/* NavBarContainer for Navbar */}
        <div>PlaceHolder for Navbar</div>
      </div>

      <div className='StationButtonContainer'> {/* Button for choosing station graph */}
        <button className={isActive === 'LearningGarden' ? 'StationButton' : 'StationButton StationButtonContainerNA'}>
          Learning Garden
        </button>
        <button className={isActive === 'FIBO' ? 'StationButton' : 'StationButton StationButtonContainerNA'}>
          FIBO
        </button>
      </div>

      <div className='GraphAndInfoContainer'>
        <div class="grid-item item1">1</div>
        <div class="grid-item item2">2</div>
        <div class="grid-item item3">3</div>  
      </div>
    </div>
  )
}

export default AnalDesk;