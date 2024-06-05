import React, { useEffect, useState } from 'react';
import './UserChat.css';
import { useSelector } from 'react-redux';
import { IoSendSharp } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function UserChat() {
  let navigate = useNavigate();

  const [chatsData, updateChatsData] = useState([]);
  const userName = useSelector((state) => state.userName);
  const chatIdOpened = useSelector((state) => state.chatIdOpened);

  let [messageToMeSent,updateMessageToMeSent] = useState();

  useEffect(() => {
    async function getChatDatabyChatId() {
      let base_url = process.env.REACT_APP_SERVER_BASE_URL;
      let responseFromServer = await fetch(`${base_url}/messages/getMessagesOfSenderToReceiver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userName,
          receiver: chatIdOpened,
        }),
      });

      responseFromServer = await responseFromServer.json();
      responseFromServer = responseFromServer.content;
      updateChatsData(responseFromServer);
    }

    if (userName && chatIdOpened) {
      getChatDatabyChatId();
    }
  }, [userName, chatIdOpened]);

  console.log(chatsData);
  async function sendMessage(event)
  {
    event.preventDefault();
    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
    await fetch(`${base_url}/messages/sendMessage`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        "sender":userName,
        "receiver":chatIdOpened,
        "message":{
          "type":"p",
          "value":messageToMeSent
        }
      })
    })
  }

  return (
    <div className="UserChatOuterBoard">
      <IoArrowBackSharp className='BackButtonToAllChats' size={40} onClick={()=>{navigate('../')}}/>
      {
        (chatIdOpened.profilePic)?<img src={chatIdOpened.profilePic}/>:<IoPersonCircleOutline size={40}/>
      
      }
      
      <label>
        <b>{chatIdOpened}</b>
      </label>
      <div className="messagesBox">
        {
          chatsData.map((x, index) => {
            if (x.message.type === 'p') 
            {
              if(x.sentByMe == true && x.message.value!=null )
              {
                return <div className='ChatComponentParaElement' key={index}><div className='ChatComponentChild'>{x.message.value}<sub style={{color:"yellow",padding:"10px"}}>{x.time.split(':')[0].substring(0,x.time.split(':')[0].length-3)}</sub></div></div>
              }
              else if(x.message.value!=null)
              {
                return <div className='ChatComponentParaElementLeft' key={index}><div className='ChatComponentChild'>{x.message.value}<sub style={{color:"yellow",padding:"10px"}}>{x.time.split(':')[0].substring(0,x.time.split(':')[0].length-3)}</sub></div></div>
              }
              
            }
            
          })
        }
      </div>
      <div className='messageSendingBox'>
        <input type='text' placeholder='enter the message.' onChange={(event)=>{updateMessageToMeSent(event.target.value)}}/>
        <IoSendSharp style={{marginLeft:"10px"}} onClick={(event)=>{sendMessage(event)}} size={30}/>
      </div>
    </div>
  );
}

export default UserChat;
