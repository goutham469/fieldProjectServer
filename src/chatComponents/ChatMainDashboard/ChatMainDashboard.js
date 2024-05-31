import React, { useEffect, useState } from 'react'
import './ChatMainDashboard.css'

import { Outlet } from 'react-router-dom'

function ChatMainDashboard() {
    
  return (
    <div className='ChatMainDashBoardDisplayContainer'>
        <h3 className='m-3'>Chats</h3>
        <Outlet/>
    </div>
  )
}

export default ChatMainDashboard