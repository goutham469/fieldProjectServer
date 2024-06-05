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
    signUpProfilePic:''
}



function checkIsSigned()
{
    let toSendData = initialState;
    let data = document.cookie;
    // console.log(data)
    data = data.split(';')
    console.log(data)

    // let chatId = '';
    // let userName = '';

    data.forEach(x=>{
        x = x.split('=')
        // console.log(x)
        
        if(x[0] == ' username')
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
    console.log(state)
    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
    switch(action.type)
    {
        case 'login':
            const now = new Date()
            const expireTime = now.getTime() + 600 * 1000 // 6000 x 1000 milliseconds = 600 seconds = 100 min
            now.setTime(expireTime);

            document.cookie = `username=${action.userName}; expires=${now.toUTCString()}; path=/;`;

            return {...state, signed:true,userName:action.userName}
        case 'logout':
            document.cookie = "username=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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

        default:
            return state;
    }
}

export default reducer