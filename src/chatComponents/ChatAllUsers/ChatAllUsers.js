import React from 'react'
import SingleChat from '../SingleChat/SingleChat'
import { useEffect,useState } from 'react'
import store from '../../store'

function ChatAllUsers() {
    let [chatUsers,updateChatUsers] = useState([])
    useEffect(()=>{
        async function getData()
        {
            let base_url = process.env.REACT_APP_SERVER_BASE_URL;
            let responseFromServer = await fetch(`${base_url}/chats/getFriends`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"userName":store.getState().userName})
            })
            
            responseFromServer = await responseFromServer.json()
            // updateChatUsers(previousData=>[...previousData,responseFromServer.friends])
            responseFromServer = responseFromServer.friends
            updateChatUsers(responseFromServer)
            // console.log(responseFromServer)
        }
        getData();
    },[])
 
    // console.log(chatUsers)

  return (
    <div style={{height:"95vh",overflowY:"scroll"}}>
        <input style={{width:"300px",height:"40px",borderRadius:"3px",margin:"10px",marginLeft:"50px"}} type='text' placeholder='Search any thing'/>
        {
            chatUsers&&chatUsers.length == 0?
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{backgroundColor:"#91b7e6",margin:"10px",padding:"10px",borderRadius:"10px"}}>
                    <p>No Friends yet, start sending requests to friends.</p>
                    <p>Go to Social section to find friends.</p>
                </div>
            </div>
            :
            chatUsers&&chatUsers.map(user=><SingleChat data={user}/>)
            
        }
    </div>
  ) 
}

export default ChatAllUsers