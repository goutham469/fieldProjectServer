import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdPersonAdd } from 'react-icons/md'
import { useNavigate,Outlet } from 'react-router-dom'
import './Notifications.css'

function Notifications() {
  const navigate = useNavigate();
  return (
    <div style={{paddingTop:"80px",height:"100vh",display:"flex",justifyContent:"space-between"}}>
      <div className='notifications-navbar'>
        <div>
          <div className='all-users-navbars'      onClick={()=>navigate('../Notifications')}>
              <FaHome size={30}/>
              <label>Home</label>
          </div> 
          <div  className='all-users-navbars'     onClick={()=>navigate('../Notifications/requests')}>
              <MdPersonAdd size={30}/>
              <label>requests</label>
          </div>
        </div>
      </div>
      
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Notifications