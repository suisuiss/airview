import Fibo from './locationImage/fibo.JPG'
import learningGarden from './locationImage/LG.jpg'
const Select = ()=>{
    return(
        <div>
            <div className="select">  
            
                
                <span className="select-direction"> Select a Location to view </span>
                <div className="location-ctn">
                    
                   
                    <div className="location-item"> 
                    <img className='location-img' src={learningGarden} />
                    <div className='location-name-ctn'>
                        <span> Learning Garden <br/> 
                        <span className='avail'> 1 available </span>  
                        </span> 
                    </div>
                    </div>
                    <div className="location-item"> 
                    <img className='location-img' src={Fibo} />
                    <div className='location-name-ctn'>
                        <span> FIBO <br/> 
                        <span className='avail'> 1 available </span>  
                        </span> 
                    </div>
                    </div>
                </div>
            
           
            </div> 
        </div>
    )
}
export default Select;