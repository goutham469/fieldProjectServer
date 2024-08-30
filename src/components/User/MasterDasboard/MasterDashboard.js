import React, { useEffect } from 'react'
import AppHeader from '../../AppHeader/AppHeader'
import './MasterDashBoard.css'
import { Outlet, useNavigate } from 'react-router-dom'

import store from '../../../store'
import socket from '../../../socket'

function MasterDashboard() {
  let navigate = useNavigate() 
  
  useEffect(()=>{ 
    
    

    if(store.getState().signed == false)
    {
      navigate('/');
    } 
  },[]) 
  return ( 
    <div className='MaterDashBoard'>
        <AppHeader/>
        <Outlet/>
    </div>
  )
}

export default MasterDashboard