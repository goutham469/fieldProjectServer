import React, { useState } from 'react'
import './AppHeader.css'
import { FaHome } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import facebookIcon from './facebook.png'
import serachIcon from '../LandingPage/assets/search.png'
import gamesIcon from './games.png'


function AppHeader() {
  let navigate = useNavigate(); 

  let [componentChoosenColor,updateComponentChoosenColor] = useState(0);
  let [headerIconHover,setHeaderIconHover] = useState(0)
  return (
    <div className='AppHeadertoDisplayFlex'>
        <div>
          <img className='app-header-facebook-image' onClick={()=>window.location.href=`${process.env.REACT_APP_CLIENT_BASE_URL}/user`} src={facebookIcon}/>
          <img className='app-header-search-icon' src={serachIcon}/>
          <input className='app-header-search-input' placeholder='Search Facebook'/>
        </div>
        <div className='AppHeadertoDisplayFlex-navbar'>
          <div className='header-navbar-div'> 
            <FaHome size={30}
             color={(componentChoosenColor==1)?"blue":"black"}
              onClick={()=>{navigate('./home');updateComponentChoosenColor(1)}}
              onMouseEnter={()=>setHeaderIconHover(1)}
              onMouseLeave={()=>setHeaderIconHover(0)}
              />
            {
              headerIconHover == 1&&<div className='header-icon-hover'>home</div>
            }
          </div>
          <div className='header-navbar-div'>
            <IoMdPeople 
            size={30} color={(componentChoosenColor==2)?"blue":"black"}
             onClick={()=>{navigate('./people');updateComponentChoosenColor(2)}}
             onMouseEnter={()=>setHeaderIconHover(2)}
              onMouseLeave={()=>setHeaderIconHover(0)}
              />
            {
              headerIconHover == 2&&<div className='header-icon-hover'>people</div>
            }
          </div>
          <div className='header-navbar-div'>
            <IoChatbubbleEllipsesOutline
             size={30} color={(componentChoosenColor==3)?"blue":"black"} 
             onClick={()=>{navigate('./chat');updateComponentChoosenColor(3)}}
             onMouseEnter={()=>setHeaderIconHover(3)}
              onMouseLeave={()=>setHeaderIconHover(0)}
              />
            {
              headerIconHover == 3&&<div className='header-icon-hover'>chats</div>
            }
          </div>
          <div className='header-navbar-div'>
            <FaRegBell 
            size={30} color={(componentChoosenColor==4)?"blue":"black"} 
            onClick={()=>{navigate('./Notifications');updateComponentChoosenColor(4)}}
            onMouseEnter={()=>setHeaderIconHover(4)}
            onMouseLeave={()=>setHeaderIconHover(0)}
              />
            {
              headerIconHover == 4&&<div className='header-icon-hover'>alerts</div>
            }
          </div>
          <div className='header-navbar-div'>
            <IoPersonCircleOutline 
            size={30} color={(componentChoosenColor==5)?"blue":"black"} 
            onClick={()=>{navigate('./ProfileDashBoard');updateComponentChoosenColor(5)}}
            onMouseEnter={()=>setHeaderIconHover(5)}
            onMouseLeave={()=>setHeaderIconHover(0)}
              />
            {
              headerIconHover == 5&&<div className='header-icon-hover'>profile</div>
            }
          </div>
        </div>
        <div style={{width:"100px",display:"flex",justifyContent:"space-around"}}>
          <img width="30px" height="30px" onClick={()=>navigate('./games')} src={gamesIcon}/>
          <IoPersonCircleOutline size={30}/>
        </div>
    </div>
  )
}

export default AppHeader