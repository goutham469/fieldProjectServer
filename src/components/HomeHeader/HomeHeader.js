import React from 'react'
import './HomeHeader.css' 
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import store from '../../store';

import facebookIcon from './facebook.png'


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
        <div className='HomeHeaderHeaderButtons p-2'>
            <img style={{marginLeft:"20px"}} width="200px"    onClick={()=>navigate('/')} src={facebookIcon}/>
        </div>
        <div>
           <p className='header-brand-text'>Facebook helps you connect and share<br/> with the people in your life.</p>
        </div>
        <div className='home-header-login-signup'>
            <div className='home-header-login-signup-outer'>
                <label className='home-header-login'   onClick={(event)=>{event.preventDefault();navigate('/login')}}  >login</label>
                <label className='home-header-signup'   onClick={(event)=>{event.preventDefault();navigate('/signUp')}}  >sign up</label>
            </div>
            {/* <div className='HomeHeaderHeaderButtons p-2' onClick={(event)=>{event.preventDefault();navigate('/login')}}>Login</div>
            <div className='HomeHeaderHeaderButtons p-2' onClick={(event)=>{event.preventDefault();navigate('/signUp')}}>Sign up</div> */}
        </div>
    </div>
  )
} 

export default HomeHeader