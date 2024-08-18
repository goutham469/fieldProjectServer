import store from "../../store";

export async function followUser(event,userName)
{
    event.preventDefault();
    let base_url = process.env.REACT_APP_SERVER_BASE_URL

    console.log(userName);
    
    await fetch(`${base_url}/chats/addFriend`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "userName":store.getState().userName,
            "friendUserName":userName
        })
    })
    await fetch(`${base_url}/users/getNonFriends`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"userName":store.getState().userName})
    }).then(data=>data.json()).then(data=>console.log(data))

}
export async function ShowCommentBox(event,PostId,PostComments,post)
  {
    event.preventDefault();
    console.log(PostId) 
    store.dispatch({type:"commentWindowOpen"})
    document.querySelector('.toDisplayCommentBoxWithFlex').style.display='block';
    console.log(store.getState())


}

export async function IncrementLike(event,PostId,type)
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
    }

}

}

// export   followUser
// export   ShowCommentBox
// export   IncrementLike