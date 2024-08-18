import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import store from '../../store';

function Googleac() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  console.log(state)

  const [data,setData] = useState([])

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/getUserNameByEmailID`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:state})
    }).then(data=>data.json()).then(data=>{
      if(data.message == "userName_associated"){setData(data.usersAssociated)}
      else{
        return <h1>seems no a/c is linked.</h1>
      }
    })
  },[])

  return (
    <div>
      {
        data.length?
        <div>
          <b>accounts linked with this email</b><br/>
          <br/>
          <b >{state}</b><br/><br/>
          <div>
            {
              data.map(x=>
              <p 
              style={{border:"1px solid black",borderRadius:"5px",padding:"2px"}}
              onClick={()=>{
                store.dispatch({
                  type:'login',
                  userName:x
              })

              navigate('/user/')
              }}
              >{x}</p>
            )
            }
          </div>
        </div>
        :
        <div>
          seems no account is linked with this email.<br/>create your a/c here <br/>
          <center>
            <a href='' onClick={()=>navigate('/signup')}>sign up</a>
          </center>
        </div>
      }
    </div>
  )
}

export default Googleac