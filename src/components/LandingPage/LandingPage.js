import React, { useEffect } from 'react';
import HomeHeader from '../HomeHeader/HomeHeader';
import { Outlet, useNavigate } from 'react-router-dom';

// import bgVideo from './Description/background.mp4';

import './LandingPage.css'; // Assuming you have a separate CSS file for styles

import store from '../../store';


function LandingPage() { 
  let navigate = useNavigate();

  // useEffect(()=>{
  //   if(store.getState().signed == true)
  //   {
  //     navigate('/user')
  //   }
  // },[])
  
  return (
    <div className="landing-page">
      {/* <video className="description-background-video" src={bgVideo} autoPlay loop muted playsInline /> */}
      <div className="overlay">
        <HomeHeader />
        <Outlet />
      </div>
    </div>
  );
}
 
export default LandingPage;
