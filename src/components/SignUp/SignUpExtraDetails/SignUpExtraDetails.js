import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import '../SignUp.css'

function SignUpExtraDetails() {

    let location = useLocation();
    let state = location.state
    console.log(state)

    let navigate = useNavigate();

    let [state1,setState1] = useState()
    let [city,setCity] = useState()
    let [date,setDate] = useState()
    let [gender,setGender] = useState('')

    function goToNext(event)
    {
        event.preventDefault();

        navigate('../SetUpPassword',{state:{
            "userName":location.state.userName,
            "email":location.state.email, 
            "State":state1,
            "city":city,
            "dateOfBirth":date,
            "gender":gender }})
    }

  return (
    <div>
        <form style={{textAlign:"center"}}>
            <b>Steps:- 2 of 4 completed.</b>
            <div style={{width:"300px",height:"15px",borderRadius:"5px",border:"1px solid black",display:"flex",padding:"0px"}}>
                <div style={{width:"70px",height:"15px",backgroundColor:"green",BorderRadiusTopleft:"5px",borderBottomLeftRadius:"5px"}}></div>
                <div style={{width:"80px",height:"15px",backgroundColor:"green",BorderRadiusTopright:"5px"}}></div>
            </div>

            <input className='signup-extra-details-input' placeholder='state' required onChange={(event)=>{setState1(event.target.value)}}/><br/>
            <input className='signup-extra-details-input' placeholder='city' required onChange={(event)=>{setCity(event.target.value)}}/><br/>
            <label>date of birth</label><br/>
            <input  className='signup-extra-details-input' type='date' required onChange={(event)=>{setDate(event.target.value)}}/><br/>
            <br/>
            <center>
                <p style={{color:'red',fontSize:'13px'}}>{!gender&&'cohoose your gender'}</p>
                <div style={{border:"1px solid black",borderRadius:"5px",width:"150px",padding:"0px"}}>
                    <button
                    style={{width:"73px",border:"none",borderBottomLeftRadius:"5px",backgroundColor:gender=='male'?'red':'white'}}
                    onClick={(event)=>{event.preventDefault();setGender("male")}}
                    >male</button>
                    <button
                    style={{width:"75px",border:"none",borderRadius:"5px",backgroundColor:gender=='female'?'blue':'white'}}
                    onClick={(event)=>{event.preventDefault();setGender("female")}}
                    >female</button>
                </div>
            </center>
            <br/>
            <button  className='signup-username-setup-button' onClick={(event)=>goToNext(event)}>Next</button>
        </form>
    </div>
  )
}

export default SignUpExtraDetails