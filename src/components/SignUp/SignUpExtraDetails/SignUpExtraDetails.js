import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function SignUpExtraDetails() {

    let location = useLocation();
    let state = location.state
    console.log(state)

    let navigate = useNavigate();

    let [state1,setState1] = useState()
    let [city,setCity] = useState()
    let [date,setDate] = useState()
    let [gender,setGender] = useState('male')

    function goToNext(event)
    {
        event.preventDefault();

        navigate('../SetUpPassword',{state:{
            "userName":location.state.userName,
            "email":location.state.email,
            "ProfilePic":location.state.ProfilePic,
            "State":state1,
            "city":city,
            "dateOfBirth":date,
            "gender":gender }})
    }

  return (
    <div>
        <form>
            <input placeholder='state' required onChange={(event)=>{setState1(event.target.value)}}/><br/>
            <input placeholder='city' required onChange={(event)=>{setCity(event.target.value)}}/><br/>
            <label>date of birth</label><br/>
            <input type='date' required onChange={(event)=>{setDate(event.target.value)}}/><br/>
            <div>
                <button onClick={(event)=>{event.preventDefault();setGender("male")}}>male</button>
                <button onClick={(event)=>{event.preventDefault();setGender("female")}}>female</button>
            </div>
            <br/>
            <button onClick={(event)=>goToNext(event)}>Next</button>
        </form>
    </div>
  )
}

export default SignUpExtraDetails