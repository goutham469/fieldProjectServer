import React, { useState } from 'react'
import { useEffect } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import './AllUsers.css'

function AllUsers() {
    let [allUsers,updateAllUsers] = useState([])

    useEffect(()=>{
        function loadUsers()
        {
            let base_url = process.env.REACT_APP_SERVER_BASE_URL
            fetch(`${base_url}/users/getNonFriends`).then(data=>data.json()).then(data=>{updateAllUsers(data)})
            console.log("fetching all users completed");
        }
        loadUsers();
        console.log(allUsers)
    },[])

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
                                            x.profilePicture && 1 ?<img src={x.profilePicture}/>:<IoPersonCircleOutline color='green' size={200}/>
                                        }
                                        <br/>
                                        <label style={{textAlign:"justify",fontSize:"24px"}}>{x.userName}</label><br/>
                                        <label>lives in {x.city}</label>
                                        <div>
                                            <button className='m-2'>follow</button>
                                            <button className='m-2'>remove</button>
                                        </div>
                                    </div>
                                }
                            )
                    }
                </div>
                :
                <p>Error 500!</p>
            }
        </div>
    </div>
  )
}

export default AllUsers