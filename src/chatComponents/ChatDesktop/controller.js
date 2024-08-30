import store from "../../store";

export async function getUsersData()
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
    // console.log(responseFromServer)
    return responseFromServer;
}