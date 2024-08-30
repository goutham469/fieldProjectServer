import React from 'react'
import { useNavigate } from 'react-router-dom'

function BookMarks() {
    const navigate = useNavigate()
  return (
    <div style={{paddingTop:"80px",height:"100vh",overflowY:"scroll"}}>
        <button
         style={{border:"1px solid black",borderRadius:"5px",marginLeft:"10px"}}
         onClick={()=>navigate('/')}
         >&lt; back</button>
        <center><b>BookMarks</b></center>
        <div>

        </div>
    </div>
  )
}

export default BookMarks