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
    signUpProfilePic:'',
    commentWindowStatus:false
}



function checkIsSigned()
{
    let toSendData = initialState;
    let data = document.cookie;
    // console.log(data)
    data = data.split(';')
    // console.log(data)

    // let chatId = '';
    // let userName = '';

    data.forEach(x=>{
        x = x.split('=')
        // console.log(x)
        
        if(x[0] == 'username' || x[0] == ' username')
        {
            if(x[1] != '')
            {
                toSendData =  {
                    signed:true,
                    userName:x[1],
                    personalData:{},
                    chatIdOpened:''
                }
            }
        }
    })
    data.forEach(x=>{
        x = x.split('=')
        {
            if(x[0] == ' chatIdOpened')
            {
                toSendData.chatIdOpened = x[1]
            }
        }
    })
    
    return toSendData;
}

function reducer(state=initialState,action)
{
    state = checkIsSigned()
    // console.log(state)
    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
    switch(action.type)
    {
        case 'login':
            const now = new Date()
            const expireTime = now.getTime() + 24*60*60 * 1000 // 60 x 60 x 1000 milliseconds = 36000 seconds = 24*60 min = 1 day
            now.setTime(expireTime);

            document.cookie = `username=${action.userName}; expires=${now.toUTCString()}; path=/;`;
            
            socket.emit('login',{"userName":action.userName})

            return {...state, signed:true,userName:action.userName}
        case 'logout':
            document.cookie = "username=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            socket.emit("logout",{"socketId":socket.id})

            return {...state,signed:false,userName:''}
        case 'openChat':
            document.cookie = `chatIdOpened=${action.chatId}; path=/;`;
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
            return state;
    }
}

export default reducer