import React, { useEffect, useState } from 'react'
import './ChatMainDashboard.css'
import { Outlet } from 'react-router-dom'


import io from 'socket.io-client'
import store from '../../store'
import { useSelector } from 'react-redux'


function ChatMainDashboard() {
  let [socket,setSocket] = useState(null)
  // let {userName} = useSelector(store=>store.getState().useState)

  useEffect(()=>{
    console.log(store.getState().userName);
    if(store.getState().userName)
    {
      let socket = io('http://localhost:8080',{

      })
      setSocket(socket);
    } 
  },[])
    
  return (
    <div className='ChatMainDashBoardDisplayContainer'>
        <h3 className='m-3'>Chats</h3>
        <Outlet/>
    </div>
  )
}

export default ChatMainDashboard