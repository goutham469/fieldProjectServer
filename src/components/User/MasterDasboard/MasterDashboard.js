import React, { useEffect } from 'react'
import AppHeader from '../../AppHeader/AppHeader'
import './MasterDashBoard.css'
import { Outlet, useNavigate } from 'react-router-dom'

import store from '../../../store'
import socket from '../../../socket'
import { io } from 'socket.io-client'

function MasterDashboard() {
  let navigate = useNavigate() 
  
  useEffect(()=>{  

    if(store.getState().signed == false)
    {
      navigate('/');
    }
    else
    {
      // establish socket connection and send userData
      socket.on('connect', () => {
        console.log('connected to socket.io server, id = ', socket.id);
      });
      
      socket.emit('new-user',{"username":store.getState().userName,"userdata":store.getState().personalData})
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