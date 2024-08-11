import React,{ useEffect, useState } from 'react';
import './Login.css'
import {Row,Col,Container,Card,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';

import store from '../../store';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


const Login =()=>{
    let navigate = useNavigate();


    let [userName,setUserName]=useState("");
    let [password,setPassword]=useState("");
    let [errorFromDB,updateErrorFromDB] = useState('')
    let [stateColor,updateStateColor] = useState('yellow')
    
    const handleLogin=async (e)=>{
        e.preventDefault();;
        if(userName == undefined || userName == null)
        {
            updateErrorFromDB('null email id');
            updateStateColor('red')
        }
        else
        {
            if(password == undefined || password == null)
            {
                updateErrorFromDB('null password not valid');
                updateStateColor('red')
            }
            else
            {
                updateErrorFromDB('');
                updateStateColor('black')
                let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                // let base_url = 'http://localhost:4000'
                let responseFromDB = await fetch(`${base_url}/users/checkLoginCredentials`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        "userName":userName,
                        "password":password
                    })
                })
                responseFromDB = await responseFromDB.json();
                if(responseFromDB.message == 'login_success')
                {
                    updateErrorFromDB('login success');
                    updateStateColor('green')

                    store.dispatch({
                        type:'login',
                        userName:userName
                    })

                    navigate('/user/home')
                    // console.log(store.getState())
                }
                else if(responseFromDB.message == 'user_name_not_exist')
                {
                    updateErrorFromDB('invalid user name');
                    updateStateColor('red')
                }
                else
                {
                    updateErrorFromDB('invalid password');
                    updateStateColor('red')
                    console.log(responseFromDB)
                }

            }
        }

    };

    async function success(response)
    {
        response = jwtDecode(response.credential).email;
        console.log(response)
    }
    return(
        <div >
            <div >
                <form onSubmit={handleLogin} className='LoginForm'>
                    <center><h5 style={{color:'#0000ff'}}>Login</h5></center>
                    <label style={{marginLeft:"10px"}}>continue with</label>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
                        <GoogleLogin onSuccess={success}/>
                    </GoogleOAuthProvider>
                    <center><label className='login-label-or'>or</label></center>
                    <hr/>
                    
                    <label className='login-username-label'>username</label><br/>
                    <input 
                    type='text'
                    className='LoginInputField' 
                    onChange={(e)=>setUserName(e.target.value)}
                    />
                    <br/>

                    <label className='login-password-label'>password</label><br/>
                    <input
                    type='password'
                    className='LoginInputField' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <br/>
                    <p style={{color:{stateColor},fontSize:'14px'}}>{errorFromDB}</p>

                    <center>
                        <button  type="submit" className='login-button' >
                            Login
                        </button>
                    </center>
                </form>
            </div>

        </div>
    )
    
}
export default Login;