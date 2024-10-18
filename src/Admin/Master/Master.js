import React, { useEffect, useState } from 'react'
import socket from '../../socket'
import { Outlet, useNavigate } from 'react-router-dom'
import './Master.css'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Master() {
  const navigate = useNavigate();
  const [signed,setSigned] = useState(false)

  function success(response)
  {
      response = jwtDecode(response.credential)
      if(response.email === process.env.REACT_APP_ADMIN_EMAIL)
      {
        setSigned(true)
        localStorage.setItem("adminName",process.env.REACT_APP_ADMIN_EMAIL)
      }
      else{alert("it is not registered admin email id !")}
  }
  useEffect(()=>{
    if(localStorage.getItem("adminName"))
    {
      if(localStorage.getItem("adminName") == process.env.REACT_APP_ADMIN_EMAIL)
      {
        setSigned(true)
      }
    }
  },[])

  return (
    <div>
      {
        signed ?
        <div className='admin-master'> 
          <div className='admin-dashboard-navbar'>
            <div>
              Admin Portal
            </div>
            <div onClick={()=>navigate('')} className='admin-dashboard-nav-link'>
              Home
            </div>
            <div onClick={()=>navigate('./all-users')} className='admin-dashboard-nav-link'>
              all users
            </div>
            <div onClick={()=>navigate('./all-posts')} className='admin-dashboard-nav-link'>
              all posts
            </div>
            <div onClick={()=>navigate('./online-active-users')} className='admin-dashboard-nav-link'>
              active users
            </div>
            <div onClick={()=>navigate('./metrics-and-statistics')} className='admin-dashboard-nav-link'>
              statistics
            </div>
            <div onClick={()=>navigate('./help-center')} className='admin-dashboard-nav-link'>
              Help center
            </div>
            <div onClick={()=>navigate('./advertisements')} className='admin-dashboard-nav-link'>
              Advertisements
            </div>
          </div>
          <div className='admin-outlet'>
            <Outlet/>
          </div>
        </div>
        :
        <div> 
          <center>
                <form style={{width:"300px", backgroundColor:"black",borderRadius:"10px",padding:"40px",color:"white",textAlign:"left"}}> 
                    <b>Welcome to Facebook <b style={{color:"red"}}>"Admin Dashboard"</b></b>
                    <br/><br/>
                    <b>1. sign in with developer email to continue further</b>
                    <p>2. this admin page is acceible for only the <b>Admin email id</b></p>
                    <p>3. other a/c credentials are not valid!</p>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
                        <GoogleLogin 
                        onSuccess={success}
                        />
                    </GoogleOAuthProvider>
                </form>
            </center>
        </div>
      }
    </div>
  )
}
 
export default Master