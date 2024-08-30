import React from 'react'
import './SignUp.css'
import { Outlet, useNavigate } from 'react-router-dom'

function SignUp() {
  const navigate = useNavigate();
  
  return (
    <div className='SignUp-Form' style={{fontSize:"14px"}}>
      <center><p style={{fontSize:'20px',fontWeight:'600',color:'#0000ff'}}>SignUp</p></center>
      <center>
        <Outlet/>
      </center>
      <br/>
      <center>
        <a href='' onClick={()=>navigate('/login')}>already had account ,login</a>
      </center>
    </div>
  )
}

export default SignUp