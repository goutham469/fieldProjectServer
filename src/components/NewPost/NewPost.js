import React, { useState } from 'react'
import './NewPost.css'
import { TiTick } from "react-icons/ti";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import store from '../../store';


import blodIcon from './asstets/blod.png'
import textIcon from './asstets/text.png'
import linkIcon from './asstets/link.png'
import audioIcon from './asstets/audio.png'
import documentIcon from './asstets/document.png'
import videoIcon from './asstets/video.png'
import imageIcon from './asstets/imageIcon.png'
import { useNavigate } from 'react-router-dom';

import PoPUpMessage from '../PopUpMessage/PoPUpMessage';

function NewPost() {
    let navigate = useNavigate();
    let [MainPage,setMainPage] = useState(0)
    let [message_to_pop_up,setmessage_to_pop_up] = useState('')
    let [postData,updatePostData] = useState([])
    let [postId,updatePostId] = useState();
    let [elementChoosen,updateElementChoosen] = useState(0)

    let [headingElement,updateHeadingElement] = useState('')
    let [headingElementError,updateHeadingElementError] = useState('')
    let [headingElementTextColor,updateHeadingElementTextColor] = useState('black')
    let [headingElementFontSize,updateHeadingElementFontSize] = useState(12)
    let [headingElementTextAlign,updateHeadingElementTextAlign] = useState('justify')

    let [paraElement,updateParaElement] = useState()
    let [paraElementError,updateParaElementError] = useState('')
    let [paraElementTextColor,updateParaElementTextColor] = useState('black')
    let [paraElementFontSize,updateParaElementFontSize] = useState(12)
    let [paraElementTextAlign,updateParaElementTextAlign] = useState('justify')

    let [linkName,updateLinkName] = useState()
    let [linkReference,updateLinkReference] = useState()
    let [linkNameError,updateLinkNameError] = useState()
    let [linkReferenceError,updateLinkReferenceError] = useState()

    function addParagraph(event)
    {
        event.preventDefault();
        if(paraElement == '' || paraElement == null)
        {
            updateParaElementError('* paragraph element is null *');
        }
        else
        {
            updateParaElementError('');
            updatePostData(previousData=>[...previousData,{"type":'p',"textColor":paraElementTextColor,"fontSize":paraElementFontSize,"textAlign":paraElementTextAlign,"value":paraElement}])
            updateParaElement('');
            updateParaElementFontSize(12);
            updateParaElementTextAlign('justify');
            updateParaElementTextColor('black');
            updateElementChoosen(0);
        }
    }
    function addHeading(event)
    {
        event.preventDefault();
        if(headingElement == '' || headingElement == null)
        {
            updateHeadingElementError('* paragraph element is null *');
        }
        else
        {
            updateHeadingElementError('');
            updatePostData(previousData=>[...previousData,{"type":'b',"textColor":headingElementTextColor,"fontSize":headingElementFontSize,"textAlign":headingElementTextAlign,"value":headingElement}])
            updateHeadingElement('');
            updateHeadingElementFontSize(12);
            updateHeadingElementTextAlign('justify');
            updateHeadingElementTextColor('black');
            updateElementChoosen(0);
        }
    }
    function addLink(event)
    {
        event.preventDefault();
        if(linkName == null || linkName == '' || linkName == undefined)
        {
            updateLinkNameError('* link name cannot be null *')
            if(linkReference == null || linkReference == '' || linkReference == undefined)
            {
                updateLinkReferenceError('* link reference cannot be null *')
            }
            else
            {
                updateLinkReferenceError('')
            }
        }
        else
        {
            updateLinkNameError('')
            if(linkReference == null || linkReference == '' || linkReference == undefined)
            {
                updateLinkReferenceError('* link reference cannot be null *')
            }
            else
            {
                updateLinkReferenceError('');
                updatePostData(previousData=>[...previousData,{"type":"link","value":linkName,"linkTo":linkReference}])
                updateLinkName('');
                updateLinkReference('');
                updateElementChoosen(0);
            }
        }
    }
    async function addImage(event)
    {
        let ImageFile = event.target.files[0];
        if(ImageFile)
        {
            let formData = new FormData();
            formData.append("photo",ImageFile);
            console.log("formData object : ",formData)

            try
            {
                let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                const response = await fetch(`${base_url}/media/uploadPostImage`,{
                    method:'POST',
                    body:formData
                });

                const data = await response.json();
                console.log(data)

                if(response.ok)
                {
                    console.log(data.file.path)
                    updatePostData(previousData=>[...previousData,{"type":"img","src":data.file.path}])
                    alert('image uploaded successfully')
                }
                else
                {
                    alert('image upload failed')
                    // console.log(response)
                }
            }
            catch(err)
            {
                alert(err)
            }
        }


        updateElementChoosen(0);
    }

    async function addVideo(event)
    {
        let videoFile = event.target.files[0]
        if(videoFile)
        {
            let formData = new FormData();
            formData.append("video",videoFile)
            // console.log("formData object : ",formData)
            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ':', pair[1]);
            //   }

            try
            {
                console.log("started to fetch server to upload video");
                
                let base_url = process.env.REACT_APP_SERVER_BASE_URL
                let response = await fetch(`${base_url}/media/uploadPostVideo`,{
                    method:"POST",
                    body:formData
                })
                console.log("fetching server completed");
                
                let data = await response.json()
                console.log(data)

                if(data.status == true)
                {
                    updatePostData(previousData=>[...previousData,{"type":"video","src":data.file.path}])
                    alert("video uploaded successfully")
                }
                else
                {
                    alert("video upload failed");
                }
            }
            catch(err)
            {
                console.log(err)
                alert(err)
            }
        }
        updateElementChoosen(0);
    }

    async function addAudio(event)
    {
        let audioFile = event.target.files[0];
        if(audioFile)
        {
            let formData = new FormData();
            formData.append('audio',audioFile)
            // console.log("formData object : ",formData)
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
              }

            try
            {
                console.log("fetching server started");
                let base_url = process.env.REACT_APP_SERVER_BASE_URL
                let responseFromServer = await fetch(`${base_url}/media/uploadPostAudio`,{
                    method:'POST',
                    body:formData
                })
                console.log("fetching server completed")

                responseFromServer = await responseFromServer.json();
                console.log(responseFromServer);

                if(responseFromServer.status == true)
                {
                    updatePostData(previousData=>[...previousData,{"type":"audio","src":responseFromServer.file.path}])
                    alert("audio uploaded successfully")
                }   
                else
                {
                    alert("audio upload failed")
                }

            }
            catch(err)
            {
                console.log(err)
                alert(err)
            }
        }
        updateElementChoosen(0);

    }
    async function addDocument(event)
    {
        let documentFile = event.target.files[0];
        if(documentFile)
        {
            let formData = new FormData();
            formData.append("document",documentFile);
            console.log(formData)

            try
            {
                let base_url = process.env.REACT_APP_SERVER_BASE_URL
                let responseFromServer = await fetch(`${base_url}/media/uploadPostDocument`,{
                    method:"POST",
                    body:formData
                })
                responseFromServer = await responseFromServer.json();

                console.log(responseFromServer);
                if(responseFromServer.status == true)
                {
                    alert("document uploaded successfully")
                    updatePostData(previousData=>[...previousData,{"type":"document","name":responseFromServer.name,"src":responseFromServer.src,"size":responseFromServer.size}])
                }
                else
                {
                    alert("document upload failed")
                }

            }
            catch(err)
            {
                console.log(err)
                alert(err)
            }
        }
    }
    async function postDataToServer(event)
    {
        event.preventDefault();
        console.log(postData)

        if(postData.length == 0)
        {
            setmessage_to_pop_up("empty post cannot be published")
            setMainPage(1)
        }
        else
        {
            let base_url = process.env.REACT_APP_SERVER_BASE_URL
            await fetch(`${base_url}/posts/getPostId`).then(data=>data.json()).then(async (data)=>{ updatePostId(data.postCount) })

            let current_date = new Date()
            let postCompleteBody = {
                "postId":postId,
                "author":store.getState().userName,
                "DatePosted" : `${current_date.getSeconds()}:${current_date.getMinutes()}:${current_date.getHours()}--${current_date.getDate()}:${current_date.getMonth()}:${current_date.getFullYear()}`,
                "DateModified" : `${current_date.getSeconds()}:${current_date.getMinutes()}:${current_date.getHours()}--${current_date.getDate()}:${current_date.getMonth()}:${current_date.getFullYear()}`,
                "likes":0,
                "upVotes":0,
                "downVotes":0,
                "comments":[],
                "views":1,
                "content":postData,
                "isBlockedByAuthor":false,
                "isBlockedByAdmin":false,
                "MetaTags":[],
                "OtherData":{}
            };
            let responseFromServer = await fetch(`${base_url}/posts/createNewPost`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(postCompleteBody)
            })
            responseFromServer = await responseFromServer.json()
            if(responseFromServer.reponseFromDataBase.acknowledged == true)
            {
                setmessage_to_pop_up("your post published, your data is now Online.")
                setMainPage(1)
            }
            else
            {
                alert("failed to reach server.")
            }
            

        }
        
    }
  return (
    MainPage == 0 ?
    <div>
        <h4 className='text-center text-success '>New Post</h4>
        <div className='m-5 p-3 newPostCurrentBody'>
            {  
                postData.map((element,index)=>{
                    // console.log("inside rendering of postData",element.value);
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
                            href={element.linkTo}
                        >
                            {element.value}
                        </a>
                        <br/>
                        </div>
                    }

                    else if(element.type == 'img')
                    {
                        return <img width="400px" height="300px" src={element.src}/>
                    }

                    else if(element.type == 'video')
                    {
                        return <video src={element.src} width="400px" height="300px" controls autoPlay loop/>
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
                })
            }
        </div>

        <div className='newPostEditor'>
            <b className='text-center'>Editor</b>
            <br/>
            <br/>
            <div>
                {
                    (elementChoosen == 0)?
                    <p  className='newPostSubEditor'>Click on the below tags to add elements you like.</p>
                    :
                    (elementChoosen == 1)?
                    <div  className='newPostSubEditor'>
                        <input placeholder='enter the heading' onChange={(event)=>updateHeadingElement(event.target.value)}/>
                        <br/>
                        <label>font-size :- {headingElementFontSize&&1?headingElementFontSize:12}</label>
                        <br/>
                        <button onClick={()=>{updateHeadingElementFontSize(headingElementFontSize-1)}}><FaCaretLeft/></button>
                        <input onChange={(event)=>{updateHeadingElementFontSize(event.target.value)}} style={{width:"50px"}} type='number' placeholder={headingElementFontSize&&1?headingElementFontSize:12}></input>
                        <button onClick={()=>{updateHeadingElementFontSize(headingElementFontSize+1)}}><FaCaretRight/></button>
                        <br/>
                        <label>text-align :- </label>
                        <select style={{margin:"10px"}}>
                            <option onClick={()=>{updateHeadingElementTextAlign('justify')}}>justify</option>
                            <option onClick={()=>{updateHeadingElementTextAlign('center')}}>center</option>
                            <option onClick={()=>{updateHeadingElementTextAlign('left')}}>left</option>
                            <option onClick={()=>{updateHeadingElementTextAlign('right')}}>right</option>
                        </select>
                        <br/>
                        <label>text-color :- </label>
                        <input className='m-2'style={{height:"20px",width:"30px"}} type='color' onChange={(event)=>{updateHeadingElementTextColor(event.target.value)}}/>

                        <p className='text-danger'>{headingElementError}</p>
                        
                        <button onClick={(event)=>{addHeading(event)}}><TiTick size={20}/></button>
                    </div>
                    :
                    (elementChoosen == 2)?
                    <div  className='newPostSubEditor'>
                        <textarea placeholder='your paragraph goes here...' onChange={(event)=>updateParaElement(event.target.value)}/>
                        <br/>
                        <label>font-size :- {paraElementFontSize&&1?paraElementFontSize:12}</label>
                        <br/>
                        <button onClick={()=>{updateParaElementFontSize(paraElementFontSize-1)}}><FaCaretLeft/></button>
                        <input onChange={(event)=>{updateParaElementFontSize(event.target.value)}} style={{width:"50px"}} type='number' placeholder={paraElementFontSize&&1?paraElementFontSize:12}></input>
                        <button onClick={()=>{updateParaElementFontSize(paraElementFontSize+1)}}><FaCaretRight/></button>
                        <br/>
                        <label>text-align :- </label>
                        <select style={{margin:"10px"}}>
                            <option onClick={()=>{updateParaElementTextAlign('justify')}}>justify</option>
                            <option onClick={()=>{updateParaElementTextAlign('center')}}>center</option>
                            <option onClick={()=>{updateParaElementTextAlign('left')}}>left</option>
                            <option onClick={()=>{updateParaElementTextAlign('right')}}>right</option>
                        </select>
                        <br/>
                        <label>text-color :- </label>
                        <input className='m-2'style={{height:"20px",width:"30px"}} type='color' onChange={(event)=>{updateParaElementTextColor(event.target.value)}}/>

                        <br/>
                        <button style={{margin:"10px"}} onClick={(event)=>{addParagraph(event)}}><TiTick size={20}/></button>
                        <p className='text-danger'>{paraElementError}</p>
                    </div>
                    :
                    (elementChoosen == 3)?
                    <form  className='newPostSubEditor'>
                        <label>link Name</label>
                        <input type='text' placeholder='Link Name' onChange={(event)=>{updateLinkName(event.target.value)}}/>
                        <p>{linkNameError}</p>
                        <br/>
                        <label>link Reference</label>
                        <input type='text' placeholder='Link reference' onChange={(event)=>{updateLinkReference(event.target.value)}}/>
                        <p>{linkReferenceError}</p>
                        <br/>

                        <button onClick={(event)=>{addLink(event)}}><TiTick size={20}/></button>
                    </form>
                    :
                    (elementChoosen == 4)?
                    <div  className='newPostSubEditor'>
                        <p>Image upload</p>
                        <input type='file' accept='image/*' onChange={(event)=>{addImage(event)}}/>
                        <br/>
                        <b>choose any kind of image file.</b>
                    </div>
                    :
                    (elementChoosen == 5)?
                    <div  className='newPostSubEditor'>
                        <p>Video upload</p>
                        <input type='file' accept='video/*' onChange={(event)=>{addVideo(event)}}/>
                        <br/>
                        <b>choose any kind of video file.</b>
                    </div>
                    :
                    (elementChoosen == 6)?
                    <div  className='newPostSubEditor'>
                        <p>Audio upload</p>
                        <input type='file' accept='audio/*' onChange={(event)=>{addAudio(event)}}/>
                        <br/>
                        <b>choose any kind of audio file.</b>
                    </div>
                    :
                    (elementChoosen == 7)?
                    <div  className='newPostSubEditor'>
                        <p>Document upload</p>
                        <input type='file' onChange={(event)=>{addDocument(event)}}/>
                        <br/>
                        <b>choose any kind of document.</b>
                    </div>
                    :
                    <p  className='newPostSubEditor'>Invalid Element</p>
                    
                }
                <div className='flex'>
                    <div className='childElement btn  m-1' onClick={(event)=>{event.preventDefault();updateElementChoosen(2)}}><img style={{width:"20px"}} src={textIcon}/></div>
                    <div className='childElement btn  m-1' onClick={(event)=>{event.preventDefault();updateElementChoosen(1)}}><img style={{width:"20px"}} src={blodIcon}/></div>
                    <div className='childElement btn m-1' onClick={(event)=>{event.preventDefault();updateElementChoosen(3)}}><img style={{width:"20px"}} src={linkIcon}/></div>
                    <div className='childElement btn m-1' onClick={(event)=>{event.preventDefault();updateElementChoosen(4)}}><img style={{width:"20px"}} src={imageIcon}/></div>
                    <div className='childElement btn m-1' onClick={(event)=>{event.preventDefault();updateElementChoosen(5)}}><img style={{width:"20px"}} src={videoIcon}/></div>
                    <div className='childElement btn m-1' onClick={(event)=>{event.preventDefault();updateElementChoosen(6)}}><img style={{width:"20px"}} src={audioIcon}/></div>
                    <div className='childElement btn m-1' onClick={(event)=>{event.preventDefault();updateElementChoosen(7)}}><img style={{width:"20px"}} src={documentIcon}/></div>
                </div>
                <button className='btn btn-success m-2 p-3' onClick={(event)=>{postDataToServer(event)}}>POST</button>
            </div>
        </div>
    </div>
    :
    <PoPUpMessage message={message_to_pop_up} to_navigate="/user/home"/>
  )
}

export default NewPost