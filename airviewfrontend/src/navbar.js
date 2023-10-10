
import "./navbar.css"
import { Link, NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
const Nav =()=>{
    return(
        <div className="nav">
        <div className="nav-ctn">
          <NavLink to='/'>  <div className="nav-icon"> <DashboardIcon style={{ fontSize: 35 }} /> </div> </NavLink> 
          <NavLink to='/analytic'> <div className="nav-icon"> <BarChartIcon style={{ fontSize: 35 }} /> </div>  </NavLink> 
          <NavLink to='/faq'>   <div className="nav-icon"> <PsychologyAltIcon style={{ fontSize: 35 }} /> </div>  </NavLink>  
          <NavLink to='/notification'>   <div className="nav-icon"> <NotificationAddIcon style={{ fontSize: 35 }} /> </div>  </NavLink> 
        </div>
        </div>
        
    )
        
    
}
export default Nav;