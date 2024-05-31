import React, { useState } from 'react'
import './AppHeader.css'
import { FaHome } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  let navigate = useNavigate();

  let [componentChoosenColor,updateComponentChoosenColor] = useState(1);
  return (
    <div className='AppHeadertoDisplayFlex'>
        <div>
          <FaHome size={30} color={(componentChoosenColor==1)?"blue":"black"} onClick={()=>{navigate('./home');updateComponentChoosenColor(1)}}/>
        </div>
        <div>
          <IoMdPeople size={30} color={(componentChoosenColor==2)?"blue":"black"} onClick={()=>{navigate('./people');updateComponentChoosenColor(2)}}/>
        </div>
        <div>
          <IoChatbubbleEllipsesOutline size={30} color={(componentChoosenColor==3)?"blue":"black"} onClick={()=>{navigate('./chat');updateComponentChoosenColor(3)}}/>
        </div>
        <div>
          <FaRegBell size={30} color={(componentChoosenColor==4)?"blue":"black"} onClick={()=>{navigate('./Notifications');updateComponentChoosenColor(4)}}/>
        </div>
        <div>
          <IoPersonCircleOutline size={30} color={(componentChoosenColor==5)?"blue":"black"} onClick={()=>{navigate('./ProfileDashBoard');updateComponentChoosenColor(5)}}/>
        </div>
    </div>
  )
}

export default AppHeader