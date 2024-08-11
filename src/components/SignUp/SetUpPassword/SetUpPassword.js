import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentTime } from '../../../Functions/getDate';

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
                    "state":location.state.State,
                    "city":location.state.city,
                    "DateOfBirth":location.state.dateOfBirth,
                    "gender":location.state.gender,
                    "interests":[],
                    "profilePicture":location.state.profilePic,
                    "DateAccountCreated":getCurrentTime(),
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
        <center>
            <label>your a/c status</label>
            <div style={{width:"300px",height:"15px",borderRadius:"5px",border:"1px solid black",display:"flex",padding:"0px"}}>
                <div style={{width:"60px",height:"15px",backgroundColor:"green",BorderRadiusTopleft:"5px",borderBottomLeftRadius:"5px"}}></div>
                <div style={{width:"60px",height:"15px",backgroundColor:"green",BorderRadiusTopright:"5px"}}></div>
                <div style={{width:"60px",height:"15px",backgroundColor:"green",BorderRadiusTopright:"5px"}}></div>
                <div style={{width:"60px",height:"15px",backgroundColor:"green",BorderRadiusTopright:"5px"}}></div>
            </div>
        </center>
        <center>
            <form onSubmit={(event)=>{checkPasswords(event)}}>
                <label style={{fontSize:"14px"}}>create a password</label><br/>
                <input className='signup-extra-details-input' onChange={(event)=>updateFirstPassword(event.target.value)}/><br/>
                <label style={{fontSize:"14px"}}>re-enter the password to conform</label><br/>
                <input className='signup-extra-details-input' onChange={(event)=>updateSecondPassword(event.target.value)}/><br/>
                <p style={{color:"red",fontSize:'13px'}}>{passwordError}</p>
                <button  className='signup-username-setup-button' onClick={(event)=>{checkPasswords(event)}}>Create Account</button>
            </form>
        </center>
    </div>
  )
}

export default SetUpPassword