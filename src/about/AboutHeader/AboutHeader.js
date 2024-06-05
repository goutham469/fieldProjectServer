import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function AboutHeader() {
    let navigate = useNavigate();
  return (
    <div style={{height:"90vh",color:"black",overflowY:"scroll"}}>
        <div style={{display:"flex",justifyContent:"space-around",width:"90vw",margin:"10px"}}>
            <div style={{backgroundColor:"white",borderRadius:"10px"}} onClick={()=>{navigate('./description')}}>Application description</div>
            <div style={{backgroundColor:"white",borderRadius:"10px"}} onClick={()=>{navigate('./Hurdles')}}>Hurdles</div>
            <div style={{backgroundColor:"white",borderRadius:"10px"}} onClick={()=>{navigate('./techstack')}} >Tech stack details</div>
        </div>
        <Outlet/>
    </div>
  )
}

export default AboutHeader