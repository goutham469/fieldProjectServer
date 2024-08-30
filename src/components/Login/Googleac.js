import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import store from '../../store';
import './Login.css'

import profilePictureIcon from '../SignUp/profile.png'

function Googleac() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  console.log(state)

  const [data,setData] = useState([])

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/getUserNameByEmailID`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:state})
    }).then(data=>data.json()).then(data=>{
      if(data.message == "userName_associated"){setData(data.usersAssociated)}
      else{
        return <h1>seems no a/c is linked.</h1>
      }
    })
  },[])

  async function login(userName)
  {
      let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/v2/users/all-details`,{
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify({user_name:userName})
        })
        data = await data.json(); 


        store.dispatch({
            type:'login',
            userName:userName,
            data:data
        })

    navigate('/user/')
    }

  

  return (
    <div>
      {
        data.length?
        <div>
          <br/>
          <b>accounts linked with <br/>{state}</b><br/>
          <br/> 
          <div>
            {
              data.map(x=>
              <div 
              className='btn googleac-users-available'
              onClick={()=>login(x.username)}
              >
                <img 
                   style={{width:"30px"}} 
                   src={x.profilePicture?x.profilePicture:profilePictureIcon}/>
                <b> {x.username} </b>
              </div>
              )
            }
          </div>
        </div>
        :
        <div>
          seems no account is linked with this email.<br/>create your a/c here <br/>
          <center>
            <a href='' onClick={()=>navigate('/signup')}>sign up</a>
          </center>
        </div>
      }
    </div>
  )
}

export default Googleac