import React from 'react'
import { useNavigate } from 'react-router-dom';

function PoPUpMessage(props) {
    let navigate = useNavigate();
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"black",height:"95vh"}}>
        <div style={{width:"200px",height:"120px",backgroundColor:"white",border:"1px solid black",borderRadius:"10px",color:"black",margin:"10em",padding:"10px"}}>
            <p style={{textAlign:"left",fontWeight:"600"}}>{props.message}</p>
            <center>
                <button onClick={(event)=>{
                    event.preventDefault();
                    navigate(props.to_navigate)
                }} style={{backgroundColor:"white",color:"black",border:"1px solid black",borderRadius:"10px"}}>Ok</button>
            </center>
        </div>
    </div>
  )
}

export default PoPUpMessage