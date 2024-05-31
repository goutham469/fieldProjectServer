import React from 'react'
import './HomeHeader.css'
import { FaSquareFacebook } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import store from '../../store';

function HomeHeader() {
  let navigate = useNavigate();

  useEffect(()=>{
      if(store.getState().signed == true)
      {
          navigate('/user')
      }
  })

  return (
    <div className='HomeHeaderDisplayFlex'>
        <div className='HomeHeaderHeaderButtons'>
            <FaSquareFacebook color='blue' onClick={(event)=>{event.preventDefault();navigate('')}} size={50}/>
        </div>
        <div className='HomeHeaderDiplayFlexFlexEnd'>
            <div className='HomeHeaderHeaderButtons' onClick={(event)=>{event.preventDefault();navigate('/login')}}>Login</div>
            <div className='HomeHeaderHeaderButtons' onClick={(event)=>{event.preventDefault();navigate('/signUp')}}>Sign up</div>
            <div className='HomeHeaderHeaderButtons'>About us</div>
            <div className='HomeHeaderHeaderButtons'>help</div>
        </div>
    </div>
  )
}

export default HomeHeader