import React from 'react'
import './ChatDesktop.css'
import store from '../../store' 
import { useEffect,useState,useSelector } from 'react'
import { IoPersonCircleOutline,IoSendSharp } from 'react-icons/io5'

import attachIcon from './pin.png'
import Time from '../../components/Time/Time'

import socket from '../../socket'
import ChatTime from '../../components/Time/ChatTime'

function ChatDesktop() {
    let [chatUsers,updateChatUsers] = useState([])

    const [chatChoosen,setChatChoosen] = useState();

    const [chatsData, updateChatsData] = useState([]);
    let [messageToMeSent,updateMessageToMeSent] = useState();

    const userName = store.getState().userName;
    // const chatIdOpened = useSelector((state) => state.chatIdOpened);


    useEffect(()=>{
        async function getData()
        { 
            let responseFromServer = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/chats/getFriends`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"userName":store.getState().userName})
            }) 

            responseFromServer = await responseFromServer.json()
            updateChatUsers(responseFromServer.friends) 
        }
        getData();

        // socket.emit('login',{"userName":store.getState().userName})

        socket.on("receiveMessage",(data)=>{
            console.log(data);
            console.log("message received")
    
            updateChatsData(prevData=>[...prevData,{"message":data.message,sentByMe:false,time:""}])
        })

        

    },[])

    async function openChat(name)
    {
        store.dispatch({
            type:'openChat',
            chatId:name
          })
        setChatChoosen(name)

        let responseFromServer = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/messages/getMessagesOfSenderToReceiver`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            sender: userName,
            receiver: name,
            }),
        });

        responseFromServer = await responseFromServer.json();
        responseFromServer = responseFromServer.content;
        updateChatsData(responseFromServer);

        console.log(responseFromServer)
        
 
    }
    async function sendMessage(event)
    {
        event.preventDefault();
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
        await fetch(`${base_url}/messages/sendMessage`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "sender":userName,
            "receiver":chatChoosen,
            "message":{
            "type":"p",
            "value":messageToMeSent
            }
        })
        })
        let date = new Date()
        // console.log(date) 
        updateChatsData(prevData=>([...prevData,{"message":{"type":'p',"value":messageToMeSent},"sentByMe":true,"time":date}]));
        updateMessageToMeSent('');

        socket.emit("sendMessage",{"receiver":chatChoosen,"sender":userName,"message":{"type":'p',"value":messageToMeSent}})
        console.log("socket message sent !")
    }

    
    

  return (
    <div className='chatDesktop-main-div'> 
        <div className='chatDesktop-left'>
            {
                chatUsers.map(userData=>
                    <div style={{borderBottom:"1px solid black"}}   onClick={()=>openChat(userData.userName)}>
                         {
                            userData&&userData.profilePic ?
                            <img width="30px" height="30px" style={{borderRadius:"30px"}} src={userData.profilePic}/>
                            :
                            <IoPersonCircleOutline size={40} style={{margin:"3px"}}/> 
                        }
                        {
                            userData&&userData.userName ?
                            <label style={{fontSize:"14px",overflowX:"hidden"}}>{userData.userName}</label>
                            :
                            <label style={{fontSize:"20px",overflowX:"hidden"}}>userName</label>
                        }
                    </div>
                )
            }
        </div>
        <div className='chatDesktop-right'>
            {
                !chatChoosen ?
                <div>
                    <b>start chatting with your friends.</b>
                </div>
                :
                <div className='chatDesktop-right-sub'> 
                    <div className='chatDesktop-right-top'>
                        {
                            (chatChoosen&&chatChoosen.profilePic)?<img src={chatChoosen.profilePic}/>:<IoPersonCircleOutline size={40}/>
                        
                        } 
                        
                        <label>
                            <b>{chatChoosen}</b>
                        </label>
                    </div>

                    <div className='chatDesktop-right-sub-main'>
                        <div className="chatDesktop-messagesBox">
                            <div>
                                {
                                chatsData.map((x, index) => {
                                    if (x.message.type === 'p') 
                                    {
                                    if(x.sentByMe == true && x.message.value!=null )
                                    {
                                        return <div className='ChatComponentParaElement' key={index}>
                                            <div className='ChatComponentChild'>
                                                {x.message.value}
                                                {/* <sub style={{color:"yellow",padding:"10px"}}>{x.time.split(':')[0].substring(0,x.time.split(':')[0].length-3)}</sub> */}
                                                {/* <Time time={x.time}/> */}
                                                <ChatTime time={x.time}/>
                                            </div>
                                        </div>
                                    }
                                    else if(x.message.value!=null)
                                    {
                                        return <div className='ChatComponentParaElementLeft' key={index}>
                                            <div className='ChatComponentChild'>
                                                {x.message.value}
                                                {/* <sub style={{color:"yellow",padding:"10px"}}>{x.time.split(':')[0].substring(0,x.time.split(':')[0].length-3)}</sub> */}
                                                {/* <Time time={x.time}/> */}
                                                <ChatTime time={x.time}/>
                                            </div>
                                        </div>
                                    }
                                    
                                    }
                                    
                                })
                                }
                            </div> 
                        </div>

                        <div className='message-sending-input-div'>
                            <form onSubmit={(event)=>sendMessage(event)}>
                                <img src={attachIcon} width="20px" className='message-sending-input-div-attachIcon'/>
                                <input  type='text' placeholder='Type a message.' 
                                onChange={(event)=>{event.preventDefault();updateMessageToMeSent(event.target.value)}}
                                value = {messageToMeSent}
                                style={{width:"90%",border:"none",backgroundColor:"#d7d8da",borderLeft:"1px solid black",height:"30px"}}
                                />
                                <button onClick={(event)=>sendMessage(event)}>send</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default ChatDesktop