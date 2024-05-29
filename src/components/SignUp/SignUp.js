import React from 'react'
import './SignUp.css'
import { Outlet } from 'react-router-dom'

function SignUp() {
  return (
    <div style={{color:"white"}} className='SignUpForm'>
      SignUp
      <Outlet/>
    </div>
  )
}

export default SignUp