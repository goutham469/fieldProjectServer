import React, { useState, useEffect } from 'react';

const PacManGame = () => {
  const boardSize = 10;
  const initialPacMan = { x: 0, y: 0 };
  const initialFood = [
    { x: 2, y: 2 },
    { x: 4, y: 4 },
    { x: 6, y: 6 },
  ];

  const [pacMan, setPacMan] = useState(initialPacMan);
  const [food, setFood] = useState(initialFood);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  // Handle key press for direction change
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Move Pac-Man
  useEffect(() => {
    const movePacMan = () => {
      setPacMan((prevPacMan) => {
        const newPacMan = {
          x: (prevPacMan.x + direction.x + boardSize) % boardSize,
          y: (prevPacMan.y + direction.y + boardSize) % boardSize,
        };

        // Check if Pac-Man eats food
        const remainingFood = food.filter((f) => !(f.x === newPacMan.x && f.y === newPacMan.y));
        if (remainingFood.length !== food.length) {
          setScore(score + 1);
          setFood(remainingFood);
        }

        return newPacMan;
      });
    };

    const gameInterval = setInterval(movePacMan, 200);
    return () => clearInterval(gameInterval);
  }, [direction, food, score]);

  // Restart the game
  const restartGame = () => {
    setPacMan(initialPacMan);
    setFood(initialFood);
    setScore(0);
    setDirection({ x: 0, y: 0 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardSize}, 40px)`,
          gridTemplateRows: `repeat(${boardSize}, 40px)`,
          gap: '2px',
          backgroundColor: 'black',
        }}
      >
        {Array.from({ length: boardSize * boardSize }).map((_, i) => {
          const x = i % boardSize;
          const y = Math.floor(i / boardSize);
          const isPacMan = pacMan.x === x && pacMan.y === y;
          const isFood = food.some((f) => f.x === x && f.y === y);
          return (
            <div
              key={i}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: isPacMan ? 'yellow' : isFood ? 'red' : 'white',
                borderRadius: isPacMan ? '50%' : '0',
              }}
            />
          );
        })}
      </div>
      <div style={{ marginTop: '20px' }}>
        <b>Score:</b> {score}
      </div>
      <button onClick={restartGame} style={{ marginTop: '20px' }}>Restart Game</button>
    </div>
  );
};

export default PacManGame;
