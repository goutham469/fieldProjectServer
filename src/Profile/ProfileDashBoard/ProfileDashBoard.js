import React, { useEffect, useState } from 'react'
import './ProfileDashBoard.css'
import deleteIcon from './deleteIcon.png'

import { useNavigate } from 'react-router-dom';
import profileIcon from "../ProfileDashBoard/profile.png" 
import { IoLogOutOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";

import store from '../../store'
import { useSelector } from 'react-redux';

function ProfileDashBoard() { 

  let navigate = useNavigate();
  let [personalData,setPersonalData] = useState(useSelector((state)=>state.personalData))
  let [postsData,setPostsData] = useState(useSelector((state)=>state.posts))

  const styleSheet = {
      personalDataChildComponent:{width:"40em",backgroundColor:"#b2b2b2",padding:"10px",margin:"10px",borderRadius:"10px"}
    }

    // console.log(postsData)
    console.log(personalData)


  async function uploadProfilePic(event)
    {
        event.preventDefault();

        let imageFile = event.target.files[0]
        if(imageFile)
        {
            let formData = new FormData();
            formData.append("photo",imageFile);

            let base_url = process.env.REACT_APP_SERVER_BASE_URL;
            console.log(base_url)
            let responseFromServer = await fetch(`${base_url}/media/uploadPostImage`,{
                method:"POST",
                body:formData
            });

            const data = await responseFromServer.json()
            if(responseFromServer.ok)
            {
                console.log(data,data.file,data.file.path);
                // personalData.profilePicture = data.file.path;
                setPersonalData(previousData=>({...previousData,profilePicture : data.file.path}))
                // updateProfilePic(data.file.path)
                base_url = process.env.REACT_APP_SERVER_BASE_URL
                let a = await fetch(`${base_url}/users/updateProfilePic`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({"userName":store.getState().userName,"url":data.file.path})
                })

                alert("profile picture uploaded")
            }
            else
            {
                alert("image upload failed")
            }
        }
    }

    async function deletePost(event,postId)
    {
      event.preventDefault();

      console.log(postId)
      let base_url = process.env.REACT_APP_SERVER_BASE_URL
      let responseFromServer = await fetch(`${base_url}/posts/deletePost`,
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"postId":postId})
        }
      )
      if(responseFromServer.ok)
      {
        postsData = postsData.filter(x=>x._id != postId)
        setPostsData(postsData)
        alert("post deleted");
      }
      else
      {
        alert("deletion failed")
      }
    }


  return (
    <div style={{paddingTop:"80px"}}>

      <div className='ProfileDashBoardToDisplayContainer'>
        <div style={styleSheet.personalDataChildComponent}>
          <div>
            {/* {
              personalData && personalData.profilePicture ? 
                <div>
                  <img style={{width:"150px"}} src={personalData.profilePicture}/>
                  <br/>
                  <button className='btn btn-success m-2' onClick={(event)=>{setPersonalData(data=>({...data,profilePicture:''}));}}>change</button>
              </div>
              :
              <div>
                  <p>You have not upload your profile pic,Do it now!</p>
                  <input type='file' accept='image/*' onChange={(event)=>{uploadProfilePic(event)}}/>
              </div>
            } */}
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                  <img style={{width:"150px"}} src={personalData&&personalData.profilePicture?personalData.profilePicture:profileIcon}/>
                  {/* <h1>Welcome, {personalData}</h1> */}
                  <br/>
                  <div 
                    // onClick={(event)=>{setPersonalData(data=>({...data,profilePicture:''}));}} 
                    className='m-2' 
                    style={{border:"1px solid black",backgroundColor:"#b2b2b2",borderRadius:"5px"}}
                    >
                    <FiEdit2 size={17}/>
                    <label 
                    style={{backgroundColor:"#b2b2b2",borderRadius:"5px"}}
                    >
                    Change picture
                    </label>
                  </div>
                </div>
                
                <div className='btn logoutButton' onClick={(event)=>{ store.dispatch({type:'logout'}); navigate('/') }}  >
                  <IoLogOutOutline color="black" size={25}/>
                  <button style={{backgroundColor:"#b2b2b2",border:"none"}}> Logout </button>
                </div>
            </div>
          </div>

          <div>
            <label>username : <b>{store.getState().userName}</b></label>
            <p>email : {personalData && personalData.email ?personalData.email:"500 not found"}</p>
            <p>city : {personalData && personalData.city ?personalData.city:"500 not found"}</p>
            <p>state : {personalData && personalData.state ?personalData.state:"500 not found"}</p>
            <p>password : {personalData && personalData.password ?personalData.password:"500 not found"}</p>
            <p>date of birth  : {personalData && personalData.DateOfBirth ?personalData.DateOfBirth:"500 not found"}</p>
            <p>gender : {personalData && personalData.gender ?personalData.gender:"500 not found"}</p>
            <p>Account created on : {personalData && personalData.DateAccountCreated ?personalData.DateAccountCreated:"500 not found"}</p>
          </div>
        </div>
 

        <div style={styleSheet.personalDataChildComponent}>
          <div>
            <h4>friends</h4>
            {
              personalData && personalData.friends ?
              <div style={{maxHeight:"80vh",overflowY:"scroll"}}>
                {
                  personalData.friends.map(x=>{
                    return <p style={{backgroundColor:"#6b6b6b",color:"white",width:"200px",borderRadius:"5px",padding:"3px",margin:"2px"}}>{x.userName}</p>
                  })
                }
              </div>
              :
              <div>500 Not found</div>
            }
          </div>

        </div>
      </div>

      <div>
        <h4>bookmarks</h4>
        {
          personalData && personalData.bookmarks ?
          <div>
            {
              personalData.bookmarks.map(x=><p>{x}</p>)
            }
          </div>
          :
          <b>You have not saved any post.</b>
        }
      </div>



      <h4>My posts</h4>
      <div  className=''>
        {
          postsData && postsData.length > 0 ?
          <div>
            {
              postsData.map(x=>{
                return <div style={{width:"300px"}} className='AllPostsChildWindow-mobile'>
                <a style={{textDecoration:"none"}} href=''>{x.author}</a>
                <button style={{border:"none",backgroundColor:"none",position:"relative",left:"8em"}} onClick={(event)=>{deletePost(event,x._id)}}><img style={{width:"23px"}} src={deleteIcon}/></button>
                <br/>
                <label>posted on : {x.DatePosted}</label><br/>
                <label>modified on : {x.DareModified}</label>
                <br/>
                <div>
                  {
                    (x.content && 1)?
                    <div>
                      {
                      x.content.map(
                        (element,index)=>
                        {
                          if(element.type == 'p')
                            {
                                return <p className='NewPostTextOverFlow'
                                    key={index}
                                    style={{
                                        color:element.textColor,
                                        fontSize:`${element.fontSize}px`,
                                        textAlign:element.textAlign
                                        }}
                                >
                                    {element.value}
                                </p>
                            }
                
                
                            else if(element.type == 'b')
                            {
                
                                return <div>
                                    <b key={index}
                                    style={{
                                        color:element.textColor,
                                        fontSize:`${element.fontSize}px`,
                                        textAlign:element.textAlign
                                    }}
                                >
                                    {element.value}
                                </b>
                                <br/>
                                </div>
                            }
                            
                            
                            else if(element.type == 'link')
                            {
                                return <div>
                                    <br/>
                                    <a key={index}
                                    target='_blank'
                                    href={element.linkTo}
                                >
                                    {element.value}
                                </a>
                                <br/>
                                </div>
                            }
                
                            else if(element.type == 'img')
                            {
                                return <img style={{borderRadius:"20px"}} width="300px"   src={element.src}/>
                            }
                
                            else if(element.type == 'video')
                            {
                                return <video style={{borderRadius:"20px"}} src={element.src} width="300px" controls loop/>
                            }
                
                            else if(element.type == 'audio')
                            {
                                return <audio src={element.src} controls />
                            }
                            
                            else if(element.type == 'document')
                            {
                                return <div>
                                    <a href={element.src}>{element.name}</a>
                                    <p>size :- {String((element.size)/1024).split('.')[0]}KB</p>
                                </div>
                            }
                            else if(element.type == 'none')
                            {
                              return <p>data not fetched</p>
                            }
                        }
                      )
                    }
                    </div>
                    :
                    <p>Error 500!</p>
                  }
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <label>likes = {x.likes}</label>
                  <label>likes = {x.upVotes}</label>
                  <label>likes = {x.downVotes}</label>
                  <label>comments</label>
                </div>
                </div>
              })
            }
          </div>
          :
          <div style={{margin:"20px",padding:"10px"}}>
            OOPs , No posts yet!
          </div>
        }
      </div>
      

    </div>
  )
}

export default ProfileDashBoard