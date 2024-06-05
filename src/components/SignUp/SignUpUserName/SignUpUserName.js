import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import store from '../../../store';

const SignUpUserName =()=>{
    let navigate = useNavigate();

    let [username,setUsername] = useState("");
    let [userNameError,updateUserNameError] = useState();
    let [statusColor,updateStatusColor] = useState('red')

    async function handleUsername(){
        // e.preventDefault();

        if(await checkUserNameInDB())
        {
            alert('username created')
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
          <p>Create a Username </p>
          <p>- this username uniquely identifies your identify</p>
          <div className='p-2'>
                        <input 
                        type='text'
                        placeholder='create username'
                        className='SignUpCreateUserName'
                        onKeyUp={(e)=>{setUsername(e.target.value);
                            // checkUserNameInDB(e)
                        }}
                        />

            </div>
                        <br/>
                        <p style={{background:"white",color:statusColor}}>{userNameError}</p>

                        <div className='mx-auto'>
                            <button variant="" type="submit" className='mx-auto ' onClick={()=>handleUsername()} > next </button>
                        </div>

        </div>
    )
    
}
export default SignUpUserName;