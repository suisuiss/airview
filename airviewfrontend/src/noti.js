
import './noti.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const noti =()=>{
    const notify =()=>{
        alert('notify me')}
    return(
        <div >
        <div className="noti"> 
            <span style={{ fontWeight:'600', fontSize:'2rem' , letterSpacing:'0.7px'}}>Let us notify you </span><br/>
            <span> <CheckCircleIcon style={{ color:"6599E8",fontSize:'30px'}}/> When There’s chance of raining </span>
            <span> <CheckCircleIcon style={{ color:"6599E8",fontSize:'30px'}}/>  When AQI levels reach the unhealty level</span> <br/>
            <button onClick={notify} className='noti-btn'><span>  notify me </span> </button>
        </div>
        </div>
    )
}

export default noti;