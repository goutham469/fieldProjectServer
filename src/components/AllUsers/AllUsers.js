import React, { useState } from 'react'
import { useEffect } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import './AllUsers.css'

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
    <div>
        <h3 className='text-success text-center'>All Users</h3>
        <input style={{width:"300px",height:"40px",marginLeft:"50px"}} placeholder='search using the userName (or) email'/>
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
                                            x.profilePicture && 1 ?<img width="200px" src={x.profilePicture}/>:<IoPersonCircleOutline color='green' size={200}/>
                                        }
                                        <br/>
                                        <label style={{textAlign:"justify",fontSize:"24px"}}>{x.userName}</label><br/>
                                        <label>lives in {x.city}</label>
                                        <div>
                                            <button className='m-2' onClick={(event)=>{followUser(event,x.userName)}}>follow</button>
                                            <button className='m-2'>remove</button>
                                        </div>
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