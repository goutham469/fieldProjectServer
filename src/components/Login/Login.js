import React,{ useEffect, useState } from 'react';
import './Login.css'
import {Row,Col,Container,Card,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';

import store from '../../store';


const Login =()=>{
    let navigate = useNavigate();


    let [userName,setUserName]=useState("");
    let [password,setPassword]=useState("");
    let [errorFromDB,updateErrorFromDB] = useState('enter your credentials')
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


    // things related to google OAuth
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return(
        <div >
            <div >
              <h2 className='text-success'>Login</h2>
                <form onSubmit={handleLogin} className='LoginForm'>
                    <input 
                    type='text'
                    className='LoginInputField'
                    placeholder='Username'
                    onChange={(e)=>setUserName(e.target.value)}
                    />

                    <br/>

                    <input
                    type='password'
                    className='LoginInputField'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                    <br/>
                    <p style={{background:"white",color:{stateColor}}}>{errorFromDB}</p>

                    <button  type="submit" className='btn btn-warning' >
                      Login
                    </button>
                  </form>
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
            </div>

        </div>
    )
    
}
export default Login;