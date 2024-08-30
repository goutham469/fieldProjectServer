import React, { useEffect, useState } from 'react'
import './AllPosts.css'
import { useNavigate } from 'react-router-dom'

import { IoPersonCircleOutline } from 'react-icons/io5'
import { CiBookmark } from 'react-icons/ci'
import viewsIcon from './assets/views.png'
import likeIcon from './assets/like.png'
import likedIcon from './assets/liked.png'
import commentIcon from './assets/comment.png'
import store from '../../store'

import friendsIcon from './assets/friends.png'
import groupsIcon from './assets/groups.png'
import bookmarkIcon from './assets/bookmark.png'
import facebookIcon from '../AppHeader/facebook.png'
import personIcon from '../AllUsers/person.png'

import CommentWindow from '../CommentWindow/CommentWindow'
import Time from '../Time/Time'

function AllPosts() {
  let navigate = useNavigate();

  let [posts,updatePosts] = useState([])
  let [commentWindowData,updateCommentWindowData] = useState([])
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)

 
  useEffect(()=>{
    async function getAllPosts()
    {
      let base_url = process.env.REACT_APP_SERVER_BASE_URL

      // console.log(base_url)

      let result = await fetch(`${base_url}/posts/getAllPosts`)
      result = await result.json()

      // console.log(result.data)

      updatePosts(result.data)

      // console.log("fetching posts completed :- ",posts)
    }
    window.addEventListener('resize',()=>{
      // console.log("window width changed , size = ",window.innerWidth);
      setWindowWidth(window.innerWidth);
    })

    getAllPosts();
  },[])

  async function ShowCommentBox(event,PostId,PostComments,post)
  {
    event.preventDefault();
    console.log(PostId)
    updateCommentWindowData(post)
    store.dispatch({type:"commentWindowOpen"})
    document.querySelector('.toDisplayCommentBoxWithFlex').style.display='block';
    console.log(store.getState())


  }

  async function IncrementLike(event,PostId,type)
  {
    event.preventDefault();
    console.log(PostId)
    const base_url = process.env.REACT_APP_SERVER_BASE_URL;
    if(type == "unlike")
    {
      let responseFromServer = await fetch(`${base_url}/posts/UnLikePost`,
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"PostId":PostId})
        }
        )
        if(responseFromServer.ok)
        {
          // document.querySelector(`.like${PostId}`).style.backgroundColor=null;
          updatePosts(previousData=>previousData.map(post=>post._id == PostId ?{...post,likes:post.likes-1}:post))
        }
    }
    else
    {
      let responseFromServer = await fetch(`${base_url}/posts/likePost`,
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"PostId":PostId})
        }
      )
      if(responseFromServer.ok)
      {
        // document.querySelector(`.like${PostId}`).style.backgroundColor="red"
        updatePosts(previousData=>previousData.map(post=>post._id == PostId ?{...post,likes:post.likes+1}:post))
      }

    }
    
  }

  async function addToBookmark(event,postId)
  {
    event.preventDefault();
    console.log(postId)
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/v2/users/add-to-bookmarks`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({"user_name":store.getState().userName,"postId":postId})
    })
    alert("saved")
  }

  const styleSheet={
    "newPostButton":{position:"absolute",top:"80px",left:"50px",backgroundColor:"white",border:"1px solid black",borderRadius:"7px"}
  }

  return (
    <div style={{paddingTop:"50px",display:"flex"}}>
      {
      windowWidth > 700 ?
      <div className='all-posts-main-div'>

        {/*left side */}
        <div className='all-posts-left-div'>
          <div    onClick={()=>navigate('./ProfileDashBoard')}     className='all-posts-left-div-child'>
            {
              store.getState().personalData.profilePicture?
              <img style={{width:"30px",marginRight:"10px",marginLeft:"10px"}}
               src={store.getState().personalData.profilePicture}/>
              :
              <IoPersonCircleOutline size={20}/>
            }
            <label className='all-posts-left-div-label'>{store.getState().userName}</label>
          </div>
          <div  onClick={()=>navigate('./people')}    className='all-posts-left-div-child'>
            <img className='all-posts-left-div-image' src={friendsIcon}/>
            <label className='all-posts-left-div-label'>find friends</label>
          </div>
          <div className='all-posts-left-div-child'>
            <img className='all-posts-left-div-image' src={groupsIcon}/>
            <label className='all-posts-left-div-label'>groups</label>
          </div>
          <div className='all-posts-left-div-child'     onClick={()=>navigate('./bookmarks')}>
            <img className='all-posts-left-div-image' src={bookmarkIcon}/>
            <label className='all-posts-left-div-label'>bookmarks</label>
          </div>
          

          <div className='all-posts-ads-main-div'>
            <center><b>sponsored</b></center>
            <br/>
            <div className='all-posts-ads'>
              <label>ads</label>
              <img width="100px" src={facebookIcon}/>
              <label>increase your<br/> social network</label>
            </div>
            <div className='all-posts-ads'>
              <label>ads</label>
              <img width="100px" src={facebookIcon}/>
              <label>increase your<br/> social network</label>
            </div>
          </div>
        </div>
      

        {/* right side */}
        <div className='all-posts-posts-scroll'>
          <div onClick={()=>{navigate('./newpost')}} className='AllPostsChildWindow'>
            <b>+ new post</b>
            <br/>
            <label>express your thoughts, ideas.</label>
          </div>
          <div className='toDisplayCommentBoxWithFlex'>
            {
              (store.getState().commentWindowStatus==true)?<CommentWindow data={commentWindowData} />:<div></div>
            }
          </div> 
          {
            
            posts.map(x=>
              {
                // console.log(x)

                return <div className='AllPostsChildWindow'>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                      <img style={{width:"30px",marginRight:"5px",borderRadius:"20px"}} src={x.profilePic?x.profilePic:personIcon}/>
                      <a
                      style={{textDecoration:"none"}}  href=''  
                      onClick={()=>navigate('name',{"state":x.author})
                    } 
                      >{x.author}
                      </a>
                    </div>
                    <CiBookmark size={25}  
                     onClick={(event)=>{addToBookmark(event,x._id)}} 
                     />
                  </div>
                  {/* <br/> */}
                  {/* <label>posted on : {x.DatePosted}</label> */}
                  {/* <label>modified on : {x.DareModified}</label> */}
                  <Time time={x.DatePosted}></Time>
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
                                  return <div>
                                    <center><img style={{borderRadius:"10px",maxWidth:"350px"}} src={element.src}/></center>
                                    <br/>
                                  </div>
                              }
                  
                              else if(element.type == 'video')
                              {
                                  return <div>
                                    <center>
                                      <video style={{borderRadius:"20px",border:"2px solid blue"}} src={element.src} width="400px" height="300px" controls loop controlsList='nodownload'/>
                                      </center>
                                    <br/>
                                  </div>
                              }
                  
                              else if(element.type == 'audio')
                              {
                                  return <center><audio src={element.src} controls controlsList='nodownload'/></center>
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
                  <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid black",marginTop:"20px"}}>
                    <label>
                      <b style={{marginRight:"5px"}}>like</b>
                        <img className={`like${x._id}liked`} src={likedIcon} width="17px"
                          style={{display:"none"}}
                         onClick={(event)=>{
                          IncrementLike(event,x._id,"unlike");
                          document.querySelector(`.like${x._id}liked`).style.display='none';
                          document.querySelector(`.like${x._id}notliked`).style.display='inline';
                          }}/> 

                        <img className={`like${x._id}notliked`}  src={likeIcon} width="15px"
                         onClick={(event)=>{
                          IncrementLike(event,x._id,"like");
                          document.querySelector(`.like${x._id}notliked`).style.display='none'
                          document.querySelector(`.like${x._id}liked`).style.display='inline';
                          }}/>  
                      
                        {/* <img className={`like${x._id}`} width="15px" src={likeIcon} onClick={(event)=>{IncrementLike(event,x._id)}}/> */}
                    {x.likes}</label> 
                    <label>
                      <b>comment</b>
                      <img className='btn' width="45px" src={commentIcon} onClick={(event)=>{ShowCommentBox(event,x._id,x.comments,x)}}/>
                      {x.comments?x.comments.length:0}
                    </label>
                    <label>
                      <img width="20px" src={viewsIcon}/>
                      {x.views ? x.views :1}
                    </label>
                  </div>
                  </div>
              }
            )
            
          }
        </div>
        

      </div>
      :
      <div style={{paddingTop:"30px"}}>
        <div onClick={()=>{navigate('/user/newpost')}} className='AllPostsChildWindow-mobile'>
          <p>+ new post</p>
        </div>
        <div className='toDisplayCommentBoxWithFlex'>
          {
            (store.getState().commentWindowStatus==true)?<CommentWindow data={commentWindowData} />:<div></div>
          }
        </div> 
        
        {
            posts.map(x=>
              {
                // console.log(x)
                return <div className='AllPostsChildWindow-mobile'>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <a  
                     style={{textDecoration:"none"}}  href=''  
                     onClick={()=>navigate('name',{"state":x.author})} 
                     >{x.author}</a>
                    <CiBookmark size={25}  
                     onClick={()=>{alert('post saved')}} 
                     />
                  </div>
                  {/* <br/> */}
                  {/* <label>posted on : {x.DatePosted}</label> */}
                  {/* <label>modified on : {x.DareModified}</label> */}
                  <Time time={x.DatePosted}/>
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
                                  return <div>
                                    <center><img style={{borderRadius:"10px",maxWidth:"250px"}} src={element.src}/></center>
                                    <br/>
                                  </div>
                              }
                  
                              else if(element.type == 'video')
                              {
                                  return <div>
                                    <center>
                                      <video style={{borderRadius:"20px"}} src={element.src} width="300px" height="200px" controls loop controlsList='nodownload'/>
                                      </center>
                                    <br/>
                                  </div>
                              }
                  
                              else if(element.type == 'audio')
                              {
                                  return <center><audio src={element.src} controls controlsList='nodownload'/></center>
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
                    <label> 
                        <img className={`like${x._id}liked`} src={likedIcon} width="17px"
                          style={{display:"none"}}
                         onClick={(event)=>{
                          IncrementLike(event,x._id,"unlike");
                          document.querySelector(`.like${x._id}liked`).style.display='none';
                          document.querySelector(`.like${x._id}notliked`).style.display='inline';
                          }}/> 

                        <img className={`like${x._id}notliked`}  src={likeIcon} width="15px"
                         onClick={(event)=>{
                          IncrementLike(event,x._id,"like");
                          document.querySelector(`.like${x._id}notliked`).style.display='none'
                          document.querySelector(`.like${x._id}liked`).style.display='inline';
                          }}/>  
                      
                        {/* <img className={`like${x._id}`} width="15px" src={likeIcon} onClick={(event)=>{IncrementLike(event,x._id)}}/> */}
                    {x.likes}</label>
                    <label>
                      <img className='btn' width="45px" src={commentIcon} onClick={(event)=>{ShowCommentBox(event,x._id,x.comments,x)}}/>
                    {x.comments?x.comments.length:0}</label>
                    <label>
                      <img width="20px" src={viewsIcon}/>
                    {x.views ? x.views :1}</label>
                  </div>
                  </div>
              }
            )
            
          }
      </div>
      }
    </div>
  )
}

export default AllPosts