import React,{useState} from 'react'

const SignUpUserName =()=>{
    let [username,setUsername] = useState("");
    let [userNameError,updateUserNameError] = useState();
    let [statusColor,updateStatusColor] = useState('red')

    const handleUsername=(e)=>{
        e.preventDefault();
        if(statusColor == 'green')
        {
            alert('userName created')
        }
        else
        {
            alert('first create userName')
        }
       console.log(username)   
    };
    async function checkUserNameInDB(event)
    {
        username=username.trim();

        if(username == undefined || username == null || username == '')
        {
            updateStatusColor('red')
            updateUserNameError('null character not accepted');
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
            }
            else
            {
                updateUserNameError("userName not available")
                updateStatusColor('red')
            }
        }
        else
        {
            updateUserNameError("Problem at server")
            updateStatusColor('red')
        }

        }


        
    }
    
    return(
        <div className='container'>
          <p>Create a Username </p>
          <div className='p-2'>
                        <input 
                        type='text'
                        placeholder='create username'
                        onKeyUp={(e)=>{setUsername(e.target.value);checkUserNameInDB(e)}}
                        />

            </div>
                        <br/>
                        <p style={{background:"white",color:statusColor}}>{userNameError}</p>

                        <div className='mx-auto'>
                            <button variant="" type="submit" className='mx-auto ' onClick={handleUsername} > next </button>
                        </div>

        </div>
    )
    
}
export default SignUpUserName;