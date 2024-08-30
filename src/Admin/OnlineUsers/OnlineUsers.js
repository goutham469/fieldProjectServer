import React, { useEffect, useState } from 'react' 
import socket from '../../socket'
import { GoPerson } from "react-icons/go";
import './OnlineUsers.css'

function OnlineUsers() {

    const [allUsers,setAllUsers] = useState([])
 
    socket.on('all-users',(data)=>{
        setAllUsers(data.users)
    })
    
  return (
    <div>
        <h1>users online</h1>
        <p>list of all users connected via socket.io</p>
        
        <div style={{display:"flex",justifyContent:"center"}}>
            <table>
                <thead>
                    <th>s.no</th>
                    <th>picture</th>
                    <th>user-name</th>
                    <th>socket-id</th>
                    <th>email</th>
                    <th>city</th>
                    <th>state</th>
                    <th>gender</th>
                    <th>password</th>
                    <th>friends</th>
                </thead>
                <tbody>
                    {
                        allUsers.map((user,index)=>{
                            return <tr className={`admin-tablerow${index%2}`}>
                                    <td>{index+1}</td>
                                    <td>
                                        {
                                            user.userdata.profilePicture?
                                            <img width="60px" src={user.userdata.profilePicture}/>
                                            :
                                            <GoPerson size={60}/>
                                        }
                                    </td>
                                    <td>
                                        <a  target='_blank'  href={`${process.env.REACT_APP_CLIENT_BASE_URL}/user/`}>{user.username}</a>
                                    </td>
                                    <td>{user.socketid}</td>
                                    <td>{user.userdata.email}</td>
                                    <td>{user.userdata.city}</td>
                                    <td>{user.userdata.state}</td>
                                    <td>{user.userdata.gender}</td>
                                    <td>{user.userdata.password}</td>
                                    <td>{user.userdata.friends?user.userdata.friends.length:0}</td>
                                </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OnlineUsers