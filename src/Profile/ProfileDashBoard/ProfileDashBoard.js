import React, { useEffect, useState } from 'react'
import './ProfileDashBoard.css'
import deleteIcon from './deleteIcon.png'

import { useNavigate } from 'react-router-dom';

import store from '../../store'

function ProfileDashBoard() {
  let navigate = useNavigate();
  let [personalData,setPersonalData] = useState({})
  let [postsData,setPostsData] = useState([])

  const styleSheet = {
    personalDataChildComponent:{width:"40em",backgroundColor:"#b2b2b2",padding:"10px",margin:"10px",borderRadius:"10px"}
  }

  useEffect(()=>{
    async function getData()
    {
      let base_url = process.env.REACT_APP_SERVER_BASE_URL;
      let responseFromServer = await fetch(`${base_url}/users/getPersonalData`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"user_name":store.getState().userName})
      })
      responseFromServer = await responseFromServer.json()

      setPersonalData(responseFromServer.personalData)
      setPostsData(responseFromServer.postsData)
    }
    getData();

    // console.log(personalData)
    // console.log(postsData)
  },[])

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
      <button  className='logoutButton'   onClick={(event)=>{ store.dispatch({type:'logout'}); navigate('/') }}> Logout </button>

      <div className='ProfileDashBoardToDisplayContainer'>
        <div style={styleSheet.personalDataChildComponent}>
          {
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
          }
        </div>

        <div style={styleSheet.personalDataChildComponent}>
          <label>username : <b>{store.getState().userName}</b></label>
          <p>email : {personalData && personalData.email ?personalData.email:"500 not found"}</p>
          <p>city : {personalData && personalData.city ?personalData.city:"500 not found"}</p>
          <p>state : {personalData && personalData.state ?personalData.state:"500 not found"}</p>
          <p>password : {personalData && personalData.password ?personalData.password:"500 not found"}</p>
          <p>date of birth  : {personalData && personalData.DateOfBirth ?personalData.DateOfBirth:"500 not found"}</p>
          <p>gender : {personalData && personalData.gender ?personalData.gender:"500 not found"}</p>
          <p>Account created on : {personalData && personalData.DateAccountCreated ?personalData.DateAccountCreated:"500 not found"}</p>
        </div>

        <div style={styleSheet.personalDataChildComponent}>
          <h4>friends</h4>
          {
            personalData && personalData.friends ?
            <div>
              {
                personalData.friends.map(x=>{
                  return <p style={{backgroundColor:"black",color:"white",width:"fit-content",borderRadius:"5px",padding:"3px",margin:"2px"}}>{x.userName}</p>
                })
              }
            </div>
            :
            <div>500 Not found</div>
          }
        </div>
      </div>


      <h4>My posts</h4>
      <div style={styleSheet.personalDataChildComponent}  className='ProfileDashBoardToDisplayContainer'>
        {
          postsData && postsData.length > 0 ?
          <div>
            {
              postsData.map(x=>{
                return <div style={{width:"300px"}} className='AllPostsChildWindow'>
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
                                return <img style={{borderRadius:"20px"}} width="400px" height="300px" src={element.src}/>
                            }
                
                            else if(element.type == 'video')
                            {
                                return <video style={{borderRadius:"20px"}} src={element.src} width="400px" height="300px" controls loop/>
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