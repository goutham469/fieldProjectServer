import React from 'react'
import socket from '../../socket'
import { Outlet } from 'react-router-dom'
import './Master.css'

function Master() {
  return (
    <div className='admin-master'>
        <h1>Admin portal</h1>
        <Outlet/>
    </div>
  )
}
 
export default Master