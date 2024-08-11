import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import store from '../../../store';

import '../SignUp.css'
import profileImage from '../profile.png'

const SignUpUserName =()=>{
    let navigate = useNavigate();

    let [username,setUsername] = useState("");
    let [userNameError,updateUserNameError] = useState();
    let [statusColor,updateStatusColor] = useState('red')

    async function handleUsername(){
        // e.preventDefault();

        if(await checkUserNameInDB())
        { 
            store.dispatch({
                type:'signUp',
                subType:'userName',
                userName:username
            })
            console.log(store.getState())

            
            navigate('./verifyEmail',{state:{"userName":username}})
        }

        // if(statusColor == 'green')
        // {
        //     alert('userName created')
        // }
        // else
        // {
        //     alert('first create userName')
        // }
       console.log(username)   
    };
    async function checkUserNameInDB()
    {
        username=username.trim();

        if(username == undefined || username == null || username == '')
        {
            updateStatusColor('red')
            updateUserNameError('null character not accepted');
            return false;
        }
        else
        {
            let base_url = process.env.REACT_APP_SERVER_BASE_URL;
            // let base_url = 'http://localhost:4000'
            let responseFromDB = await fetch(`${base_url}/users/checkUserName`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"userName":username})
            })
            responseFromDB = await responseFromDB.json()

            if(responseFromDB.status == true)
            {
                if(responseFromDB.existence == 'not_exists')
                {
                    updateUserNameError("valid userName")
                    updateStatusColor('green')

                    return true
                }
                else
                {
                    updateUserNameError("userName not available")
                    updateStatusColor('red')
                    return false;
                }
            }
            else
            {
                updateUserNameError("Problem at server")
                updateStatusColor('red')
                return false
            }

        }
    }
    
    
    return(
        <div className='container'>
          <center>
            <label>your a/c status</label>
          <div style={{width:"300px",height:"15px",borderRadius:"5px",border:"1px solid black",display:"flex",padding:"0px"}}>
          </div>
            <br/>
            <p>Create a Username </p>
          </center>
          <div className='p-2'>
                <img style={{position:"relative",left:"25px"}} width="17px" src={profileImage}/>
                <input 
                type='text'
                placeholder='username'
                className='SignUpCreateUserName'
                onKeyUp={(e)=>{setUsername(e.target.value);
                    // checkUserNameInDB(e)
                }}
                />

            </div> 
                <center><p style={{color:statusColor,fontSize:"13px"}}>{userNameError}</p></center>

                <center>
                    <button className='signup-username-setup-button' onClick={()=>handleUsername()}>next</button>
                </center>

        </div>
    )
    
}
export default SignUpUserName;