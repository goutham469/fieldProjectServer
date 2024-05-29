import React from 'react'
import AppHeader from '../../AppHeader/AppHeader'
import './MasterDashBoard.css'
import { Outlet } from 'react-router-dom'

function MasterDashboard() {
  return (
    <div className='MaterDashBoard'>
        <AppHeader/>
        <Outlet/>
    </div>
  )
}

export default MasterDashboard