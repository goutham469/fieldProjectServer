import React from 'react'
import './ProfileDashBoard.css'

import { useNavigate } from 'react-router-dom';

import store from '../../store'

function ProfileDashBoard() {
  let navigate = useNavigate();
  return (
    <div className='ProfileDashBoardToDisplayContainer'>
      <h3>Profile dashboard</h3>
      <div className='userData'>
        <label>username : <b>{store.getState().userName}</b></label>
      </div>
      <button
        className='logoutButton'
       onClick={(event)=>{
        store.dispatch({type:'logout'});
        navigate('/')
        }}> Logout </button>
    </div>
  )
}

export default ProfileDashBoard