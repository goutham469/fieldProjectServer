import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = () => {
  const boardSize = 16;
  const initialSnake = [{ x: 10, y: 10 }];
  const initialFood = { x: 12, y: 10 };
  const initialDirection = { x: 1, y: 0 };

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(initialDirection);
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [pause, setPause] = useState(false);
  const [score, setScore] = useState(0);

  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const speedRef = useRef(speed);

  // Update refs when state changes
  useEffect(() => {
    snakeRef.current = snake;
    directionRef.current = direction;
    speedRef.current = speed;
  }, [snake, direction, speed]);

  // Handle key press for direction change
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (directionRef.current.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (directionRef.current.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (directionRef.current.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop to move the snake
  useEffect(() => {
    if (gameOver || pause) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const newHead = {
          x: (newSnake[0].x + directionRef.current.x + boardSize) % boardSize,
          y: (newSnake[0].y + directionRef.current.y + boardSize) % boardSize,
        };

        // Check for collisions with the snake's body
        if (newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          // fetch api to update user score 

          return prevSnake;
        }

        newSnake.unshift(newHead);

        // Check if the snake has eaten the food
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
          });
          setScore((prevScore) => prevScore + 1); // Increment score
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speedRef.current);
    return () => clearInterval(gameInterval);
  }, [gameOver, pause, food]);

  // Restart the game
  const restartGame = () => {
    setSnake(initialSnake);
    setDirection(initialDirection);
    setFood(initialFood);
    setGameOver(false);
    setPause(false);
    setScore(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${boardSize}, 20px)`,
            gridTemplateRows: `repeat(${boardSize}, 20px)`,
            gap: '1px',
            backgroundColor: 'black',
          }}
        >
          {Array.from({ length: boardSize * boardSize }).map((_, i) => {
            const x = i % boardSize;
            const y = Math.floor(i / boardSize);
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={i}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'white',
                  borderRadius: "2px"
                }}
              />
            );
          })}
        </div>

        <div style={{ margin: "10px", padding: "10px", backgroundColor: "#bebfc2" }}>
          <div>
            <b>Level</b>
            <select onChange={(e) => setSpeed(parseInt(e.target.value))}>
              <option value="200">Very Easy</option>
              <option value="150">Easy</option>
              <option value="100">Normal</option>
              <option value="50">Hard</option>
              <option value="30">Very Hard</option>
            </select>
            <br />
          </div>

          <div>
            <b>Controls</b><br />
            <button  style={{marginLeft:"40px"}} onClick={() => { if (directionRef.current.y !== 1) setDirection({ x: 0, y: -1 }) }}>Up</button><br />
            <button onClick={() => { if (directionRef.current.x !== 1) setDirection({ x: -1, y: 0 }) }}>Left</button>
            {pause ?
              <button onClick={() => setPause(false)}>Resume</button> :
              <button onClick={() => setPause(true)}>Pause</button>
            }
            <button onClick={() => { if (directionRef.current.x !== -1) setDirection({ x: 1, y: 0 }) }}>Right</button><br />
            <button   style={{marginLeft:"40px"}}  onClick={() => { if (directionRef.current.y !== -1) setDirection({ x: 0, y: 1 }) }}>Down</button>
          </div>

          <div>
            <b>Score:</b> {score}
          </div>

        </div>

      </div>
      {gameOver && <h2>Game Over!</h2>}
      <button onClick={restartGame} style={{ marginTop: '20px' }}>Restart Game</button>
    </div>
  );
};

export default SnakeGame;
