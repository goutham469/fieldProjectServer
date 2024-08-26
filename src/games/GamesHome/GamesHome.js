import React from 'react'
import snakeIcon from './snake.png'
import { useNavigate,Outlet } from 'react-router-dom'
import SnakeGame from '../SnakeGame/SnakeGame';
import PacManGame from '../PacManGame/PacManGame';
import DinoGame from '../Dino/DinoGame';

function GamesHome() {
  const navigate = useNavigate();

  return (
    <div style={{paddingTop:"80px",height:"100vh"}}>
      <div style={{margin:"30px"}}>


        <b>available games</b>
        <div style={{backgroundColor:"#aabbcc",width:"fit-content",padding:"5px"}}
        onClick={()=>navigate('./snake')}
        >
          <img src={snakeIcon} className='game-icon' width="40px"/>
          <b>Snake game</b>
        </div>


        <div style={{backgroundColor:"#aabbcc",width:"fit-content",padding:"5px"}}
        onClick={()=>navigate('./pacman')}
        >
          <img src={snakeIcon} className='game-icon' width="40px"/>
          <b>Pac Man game</b>
        </div>


        <div style={{backgroundColor:"#aabbcc",width:"fit-content",padding:"5px"}}
        onClick={()=>navigate('./dino')}
        >
          <img src={snakeIcon} className='game-icon' width="40px"/>
          <b>Dino game</b>
        </div> 

      </div>
      <Outlet/>

      <br/>
      <br/>
      <p>---</p>
    </div>
  )
}

export default GamesHome 