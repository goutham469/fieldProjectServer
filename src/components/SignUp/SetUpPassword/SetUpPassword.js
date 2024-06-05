import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function SetUpPassword() {

    let location = useLocation();
    let navigate = useNavigate();


    let [firstPassword,updateFirstPassword] = useState()
    let [secondPassword,updateSecondPassword] = useState()
    let [passwordError,updatePasswordError] = useState();

    function checkPasswords(event)
    {
        event.preventDefault();
        if(firstPassword != undefined && firstPassword != null && secondPassword != undefined && secondPassword != null)
        {
            if(firstPassword != secondPassword)
            {
                updatePasswordError('passwords not matched')
            }
            else
            {
                updatePasswordError('')
                createUserFinalStep();
            }
        }
        else
        {
            updatePasswordError('passwords not valid,NULL characters found')
        }
            
    }
    async function createUserFinalStep()
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
        await fetch(`${base_url}/users/createUser`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(
                {
                    "userName":location.state.userName,
                    "email":location.state.email,
                    "password":firstPassword,
                    "state":"telangana",
                    "city":"khammam",
                    "DateOfBirth":"10-06-2004",
                    "gender":"male",
                    "interests":[],
                    "profilePicture":location.state.profilePic,
                    "DateAccountCreated":"",
                    "Profession":"",
                    "EducationalQualifications":[],
                    "friends":[],
                    "data2":"",
                    "data3":""
                }
            )
        })
        alert('account created, login to continue');
        navigate('/login')
    }
  return (
    <div>
        <form onSubmit={(event)=>{checkPasswords(event)}}>
            <label>create a password</label><br/>
            <input onChange={(event)=>updateFirstPassword(event.target.value)}/><br/>
            <label>re-enter the password to conform</label><br/>
            <input onChange={(event)=>updateSecondPassword(event.target.value)}/><br/>
            <p style={{color:"red",backgroundColor:"white"}}>{passwordError}</p>
            <button onClick={(event)=>{checkPasswords(event)}}>Create Account</button>
        </form>
    </div>
  )
}

export default SetUpPassword