import React, { useState } from 'react';
// import { GoogleLogin } from 'react-google-login';
import {  GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';

import store from '../../../store';



function GoogleOAuthVerification() {
  let navigate = useNavigate();

  let location = useLocation();
  console.log(location,location.state,location.state.userName)
  
  let userNameFromSignUp = location.state.userName;

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    const decodedToken = jwtDecode(response.credential);
    console.log('Decoded Token:', decodedToken);
    if(decodedToken.email_verified)
    {
      store.dispatch({
        type:'signUp',
        subType:'email',
        email:decodedToken.email
    })
    console.log(store.getState())
    
      navigate('../uploadProfilePic',{state:{"userName":userNameFromSignUp,"email":decodedToken.email}})
    }
    // You can now send the decoded token to your server for further verification
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  return (
    <div>
      <h4>To Continue further verify your google account</h4>
      <p>-this process makes sure there will be no <b>malicious users</b>.</p>
      <p>click on the below google icon to verify your account</p>
      
        <GoogleLogin
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    
    </div>
  );
}

export default GoogleOAuthVerification;
