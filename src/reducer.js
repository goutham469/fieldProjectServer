import socket from "./socket";

let initialStateSignUp = {
    userName : '',
    email : '',
    profilePic :''
}

let initialState = {
    signed:false,
    userName:'',
    personalData:{},
    chatIdOpened:'',
    signUpUserName:'',
    signUpEmailId:'', 
    commentWindowStatus:false,
    navbarStatus:0
}



function checkIsSigned()
{
    let toSendData = initialState;
    if(localStorage.getItem("username"))
    {
        // signed
        toSendData.signed=true;
        toSendData.userName = localStorage.getItem("username")
        toSendData.personalData = JSON.parse(localStorage.getItem("userdata")).personalData
        toSendData.posts = JSON.parse(localStorage.getItem("userdata")).postsData

    }
    // console.log(toSendData)
    
    return toSendData;
}

function reducer(state=checkIsSigned(),action)
{
    // console.log(state) 
    switch(action.type)
    {
        case 'login':  

            localStorage.setItem("userdata",JSON.stringify(action.data))
            localStorage.setItem("username",action.userName)
            
            socket.emit('login',{"userName":action.userName})

            return {...state, signed:true,userName:action.userName}
        case 'logout': 
            localStorage.clear()

            socket.emit("logout",{"socketId":socket.id})

            return {...state,signed:false,userName:''}
        case 'openChat':
            // document.cookie = `chatIdOpened=${action.chatId}; path=/;`;
            localStorage.setItem("chatIdOpened",action.chatId)
            return {...state,chatIdOpened:action.chatId}
        case 'signUp':
            switch(action.subType)
            {
                case 'userName':
                    return {...state,signUpUserName:action.userName}
                case 'email':
                    return {...state,signUpEmailId:action.email}
                case 'profilePic' :
                    return {...state,signUpProfilePic:action.profilePic}
                default:
                    return state;
            }
        case 'commentWindowOpen':
            return {...state,commentWindowStatus:true}
        case 'commentWindowClose':
            return {...state,commentWindowStatus:false}

        default:
            console.log(state)
            return state;
    }
}

export default reducer