import React, { useEffect } from 'react'
import AppHeader from '../../AppHeader/AppHeader'
import './MasterDashBoard.css'
import { Outlet, useNavigate } from 'react-router-dom'

import store from '../../../store'

function MasterDashboard() {
  let navigate = useNavigate()

  useEffect(()=>{
    // console.log(store,store.getState())
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