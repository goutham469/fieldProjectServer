import React, { useEffect, useState } from 'react'
import './ChatMainDashboard.css'
import { Outlet } from 'react-router-dom'


import io from 'socket.io-client'
import store from '../../store'
import { useSelector } from 'react-redux'
import ChatAllUsers from '../ChatAllUsers/ChatAllUsers'
import ChatDesktop from '../ChatDesktop/ChatDesktop'

 
function ChatMainDashboard() {
  let [socket,setSocket] = useState(null)
  // let {userName} = useSelector(store=>store.getState().useState)
  const [displayWidth,setDisplayWidth] = useState(window.innerWidth);

  useEffect(()=>{
    // console.log(store.getState().userName);
    if(store.getState().userName)
    {
      let socket = io('http://localhost:8080',{

      })
      setSocket(socket);
    }  
    window.addEventListener('resize',()=>{
      setDisplayWidth(window.innerWidth)
    })
  },[])
    
  return (
    <div>
        {
          displayWidth > 600 ? 
            <ChatDesktop /> 
          :
          <Outlet/>
        }
    </div>
  )
} 

export default ChatMainDashboard