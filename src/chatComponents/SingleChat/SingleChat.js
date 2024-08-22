import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import './SingleChat.css'
import { useNavigate } from 'react-router-dom';

import store from '../../store';

function SingleChat(props) {
    let navigate=useNavigate()

    // console.log(props.data)
    let userData = props.data
    async function openChatOf(event)
    {
      event.preventDefault();
      // console.log(userData)
      store.dispatch({
        type:'openChat',
        chatId:userData.userName
      })

      navigate('./ChatOf');
    }
  return (
    <div className='SingleChat-mobile' onClick={(event)=>{openChatOf(event)}}>
        {
            userData.profilePic ?
            <img width="50px" height="50px" style={{borderRadius:"50px"}} src={userData.profilePic}/>
            :
            <IoPersonCircleOutline size={50} style={{margin:"3px"}}/>
        }
        {
            userData.userName ?
            <label style={{fontSize:"20px",overflowX:"hidden"}}>{userData.userName}</label>
            :
            <label style={{fontSize:"20px",overflowX:"hidden"}}>userName</label>
        }
    </div> 
  )
}

export default SingleChat