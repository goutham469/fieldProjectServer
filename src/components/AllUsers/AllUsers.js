import React, { useState } from 'react'
import { useEffect } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import './AllUsers.css'

import personImage from './person.png'

import store from '../../store';

function AllUsers() {
    let [allUsers,updateAllUsers] = useState([])

    useEffect(()=>{
        function loadUsers()
        {
            let base_url = process.env.REACT_APP_SERVER_BASE_URL
            fetch(`${base_url}/users/getNonFriends`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"userName":store.getState().userName})
            }).then(data=>data.json()).then(data=>{updateAllUsers(data)})
            console.log("fetching all users completed");
        }
        loadUsers();
        console.log(allUsers)
    },[])

    async function followUser(event,userName)
    {
        event.preventDefault();
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        await fetch(`${base_url}/chats/addFriend`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "userName":store.getState().userName,
                "friendUserName":userName
            })
        })
        await fetch(`${base_url}/users/getNonFriends`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"userName":store.getState().userName})
        }).then(data=>data.json()).then(data=>{updateAllUsers(data)})
 
    }

  return (
    <div style={{paddingTop:"90px"}}>
        <input style={{width:"300px",height:"35px",marginLeft:"50px",borderRadius:"10px",border:"1px solid black",padding:"2px"}} placeholder='search using user-name'/>
        <div className='AllUsersComponentParent'>
            {
                allUsers.length > 0 ?
                <div className='AllUsersComponentParent'>
                    {
                        allUsers.map(
                            x=>
                                {
                                    return <div className='AllUsersChildComponenent'>
                                        {
                                            x.profilePicture && 1 ?<img width="200px" src={x.profilePicture}/>:<img className='allusers-person-image' src={personImage}/>
                                        }
                                        <br/>
                                        <label className='allusers-user-child-username'>{x.userName}</label><br/>
                                        
                                        <center>
                                            <button className='allusers-user-child-button-add-friend' onClick={(event)=>{followUser(event,x.userName)}}>Add Friend</button><br/>
                                            <button className='allusers-user-child-button-remove-friend'>Remove</button>
                                        </center>
                                    </div>
                                }
                            )
                    }
                </div>
                :
                <p style={{margin:"50px",fontSize:"36px"}}>Error 500! <br/>Problem at server.</p>
            }
        </div>
    </div>
  )
}

export default AllUsers