import React, { useEffect, useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineSend } from "react-icons/ai";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import './CommentWindow.css'

import store from '../../store';
import { type } from '@testing-library/user-event/dist/type';

function CommentWindow(props) {

    let [x,updatex]=useState([])
    let [commentData,updateCommentData] = useState();

    let[CommentsWindowArticleId,updateCommentsWindowArticleId]=useState();
    let[activateCommentButton,updateActivateCommentButton]=useState();
    
    useEffect(()=>{
        // console.log(props)
        updatex(props.data.comments)
        // console.log("updatex used : ",x,props)
        // console.log(props.data.articleId)
        updateCommentsWindowArticleId(props.data._id)

        // console.log(store.getState().commentWindowStatus)
    })

    function closeChildCommentsWindow()
    {
        console.log("closing comments window")

        store.dispatch({
            type:'commentWindowClose'
        })
        // console.log(store.getState().commentWindowStatus)
        document.querySelector('.toDisplayCommentBoxWithFlex').style.display='none';
    }
    


    async function postAComment()
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL

        if(commentData)
        {
            let obj = {"comment":commentData,"userName":store.getState().userName,"PostId":CommentsWindowArticleId}

            console.log(obj)

            document.querySelector('.CommentWindowPostCommentInput').value = '';

            // console.log(articleId);

            await fetch(`${base_url}/posts/postComment`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(obj)
            }).then(data=>data.json()).then(z=>{console.log(z);alert("comment posted")}).catch(err=>alert(err))
        }else{alert('empty comment,not posted')}
    }


  return (
    <div className='row CommentsWindowOuterEdge'>
        <div className='toCloseCommentsPopUpWindow'><RxCross1 color='red' size={30} onClick={()=>{closeChildCommentsWindow()}}/></div>
        <center><h3>comments</h3></center>
        <div className='col-lg-12 row'>
            <div className='OptionTypeForScrollingComments'>
                <div>{x.map(y=>
                                <div className='comments0052 m-1'>
                                    <div className='row'>
                                        <div className='col-lg-2 col-2 mt-2'>
                                            {
                                                (y.ProfilePicture)?<img src={y.ProfilePicture}/>:<BsPersonCircle size={40}/>
                                            }
                                        </div>

                                        <div className='col-lg-10 col-10 row'>
                                            <div className='col-lg-12 col-12 NameOverFlow'>{y.userName}</div>
                                            <div className='comments0053'>{y.comment}</div>
                                        </div>

                                        <div className='row col-lg-12 col-12'>
                                            <div className='col-lg-1 col-4'>
                                                {
                                                    (x.TimePosted)?<p>{x.TimePosted}</p>:<p>time</p>
                                                }
                                            </div>
                                            <div className='col-lg-4 col-4'></div>
                                            <div className='col-lg-3 col-2'>
                                                <BiUpvote/><label> {y.upVotes}</label> 
                                            </div>
                                            <div className='col-lg-3 col-2'>
                                                <BiDownvote/><label> {y.downVotes}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                </div>
            </div>
            <div className='commentAddingSection row'>
                <div className='col-lg-10'>
                    <input className='CommentWindowPostCommentInput' type='text' placeholder='comment' onChange={(event)=>{updateCommentData(event.target.value)}}/>
                </div>
                <div className='col-lg-1 mt-2'>
                    <AiOutlineSend size={25} onClick={()=>{postAComment()}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentWindow