import React from 'react'
import './SignUp.css'
import { Outlet } from 'react-router-dom'

function SignUp() {
  
  return (
    <div className='SignUp-Form' style={{fontSize:"14px"}}>
      <center><p style={{fontSize:'20px',fontWeight:'600',color:'#0000ff'}}>SignUp</p></center>
      <Outlet/>
    </div>
  )
}

export default SignUp