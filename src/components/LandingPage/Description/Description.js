import React, { useState } from 'react'
// import bgVideo from './background.mp4'
import { useNavigate } from 'react-router-dom'
import './Description.css'

//assets
import searchIcon from '../assets/search.png'
import friendIcon from '../assets/friends.png'
import chatsIcon from '../assets/chats.png'
import videoChatIcon from '../assets/videocall.png'
import gamesIcon from '../assets/games.png'
import getStarted from '../assets/getStarted.png'
import getStartedGreen from '../assets/rocket.png'


function Description() {

  const navigate = useNavigate();

  const [hoverChanges,setHoverChanges] = useState({
    friendsIcon:false,
    chatsIcon:false,
    videoChatIcon:false,
    gamesIcon:false,
    getStartedIcon:false
  })
  return (
    <div>
        {/* <h1 className='DescriptionFirstText'>Hi every welcome to our social media application</h1>
        <h3 className='DescriptionFirstText'>Login if you already has an account</h3>
        <h4 className='DescriptionFirstText'>(or)</h4>
        <h3 className='DescriptionFirstText'>create a new account by clicking on Sign Up</h3>
        <p className='DescriptionFirstText'>To know about the developer ,<br/> and the technologies used ,<br/>hard situations came across developing the application.<br/> click on <b>about us</b></p>
        <h5 style={{color:"black"}}>If you are confused of the stuff simply hit Help</h5> */}


        <div style={{width:"90vw",padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap"}}>

            {
              hoverChanges.friendsIcon?
              <div className='description-advantages' onMouseLeave={()=>setHoverChanges(state=>({...state,friendsIcon:false}))}>
                <b>friends</b>
                <br/>
                <br/>
                <ul style={{textAlign:"left"}}>
                  <li>add and block friends</li>
                  <li>lock your profile</li>
                  <li>hide your data to public</li>
                </ul>
              </div>
              :
              <div className='description-advantages' onMouseEnter={()=>setHoverChanges(state=>({...state,friendsIcon:true}))}>
                <img style={{width:"200px"}} src={friendIcon}/><br/>
                <label>make friends online , <br/>and build your social circle.</label>
              </div>
            }

            {
              hoverChanges.chatsIcon ?
              <div className='description-advantages' onMouseLeave={()=>setHoverChanges(state=>({...state,chatsIcon:false}))}>
                <b>chatting</b>
                <br/>
                <br/>
                <ul style={{textAlign:"left"}}>
                  <li>chat with all your friends list</li>
                  <li>block/unblock some one</li>
                  <li>messages are encrypted</li>
                  <li>even we cannot see you messages</li>
                  <li>supports all multimedia files</li>
                </ul>
              </div>
              :
              <div className='description-advantages' onMouseEnter={()=>setHoverChanges(state=>({...state,chatsIcon:true}))}>
                <img style={{width:"200px"}} src={chatsIcon}/><br/>
                <label>lot many friends online , <br/>connect and chat with them.</label>
              </div> 
            } 

          </div>



          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap"}}>

            {
              hoverChanges.videoChatIcon?
              <div className='description-advantages' onMouseLeave={()=>setHoverChanges(state=>({...state,videoChatIcon:false}))}>
                <b>video calling</b>
                <br/>
                <br/> 
                <ul style={{textAlign:"left"}}>
                  <li>call any of your friends list</li>
                  <li>or even a group call upto 50 memebers</li>
                  <li>256-bit encryption</li>
                  <li>conduct even classes</li>
                </ul>
              </div>
              :
              <div className='description-advantages' onMouseEnter={()=>setHoverChanges(state=>({...state,videoChatIcon:true}))} >
                <img style={{width:"200px"}} src={videoChatIcon}/><br/>
                <label>see and talk to with your colleges on online.</label>
              </div>
            }

            <div className='description-advantages'>
              <div className='description-search-div'>
                <img className='description-search-bar-image' width="20px" src={searchIcon}/>
                <label className='description-search-bar-label'>what you can get</label>
                <ul style={{marginLeft:"20px"}}>
                  <li>
                    <img/>
                    <label>chatting</label>
                  </li>
                  <li>
                    <img/>
                    <label>calls</label>
                  </li>
                  <li>
                    <img/>
                    <label>share</label>
                  </li>
                </ul> 
                <center>
                  <button className='description-get-started-button'
                    onMouseEnter={()=>setHoverChanges(state=>({...state,getStartedIcon:true}))}
                    onMouseLeave={()=>setHoverChanges(state=>({...state,getStartedIcon:false}))}
                    onClick={(event)=>{event.preventDefault();navigate('/signup')}}>
                    {
                      !hoverChanges.getStartedIcon ?
                      <img width="20px" src={getStarted}/>
                      :
                      <img width="20px" src={getStartedGreen}/>
                    }
                    <label> get started</label>
                  </button>
                </center>
              </div>
            </div>

            {
              hoverChanges.gamesIcon ?
              <div className='description-advantages' onMouseLeave={()=>setHoverChanges(state=>({...state,gamesIcon:false}))}>
                <b>Games</b>
                <br/>
                <br/>
                <ul style={{textAlign:"left"}}>
                  <li>lot many games to play</li>
                  <li>play as friends.</li>
                  <li>Invite your friends to beat you</li>
                  <li>leaderboards and many more</li>
                </ul>
              </div>
              :
              <div className='description-advantages' onMouseEnter={()=>setHoverChanges(state=>({...state,gamesIcon:true}))}>
                <img style={{width:"200px"}} src={gamesIcon}/><br/>
                <label>many games to play, <br/>challenge with your friends.</label>
              </div>
            }

          </div>
        </div>


        <div className='description-detailed-explanation'>
          <div className='description-detailed-explanation-item'>
            <img style={{width:"200px"}} src={friendIcon}/><br/>
            <div>
                <b>friends</b>
                <br/>
                <br/>
                <ul style={{textAlign:"left"}}>
                  <li>add and block friends</li>
                  <li>lock your profile</li>
                  <li>hide your data to public</li>
                </ul>
            </div>
          </div>

          <div className='description-detailed-explanation-item'>
            <img style={{width:"200px"}} src={chatsIcon}/><br/>
            <div>
                <b>friends</b>
                <br/>
                <br/>
                <ul style={{textAlign:"left"}}>
                  <li>add and block friends</li>
                  <li>lock your profile</li>
                  <li>hide your data to public</li>
                </ul>
            </div>
          </div>

          <div className='description-detailed-explanation-item'>
            <img style={{width:"200px"}} src={videoChatIcon}/><br/>
            <div>
                <b>friends</b>
                <br/>
                <br/>
                <ul style={{textAlign:"left"}}>
                  <li>add and block friends</li>
                  <li>lock your profile</li>
                  <li>hide your data to public</li>
                </ul>
            </div>
          </div>

          <div className='description-detailed-explanation-item'>
            <img style={{width:"200px"}} src={gamesIcon}/><br/>
            <div>
                <b>friends</b>
                <br/>
                <br/>
                <ul style={{textAlign:"left"}}>
                  <li>add and block friends</li>
                  <li>lock your profile</li>
                  <li>hide your data to public</li>
                </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Description