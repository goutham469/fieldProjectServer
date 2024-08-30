// // src/DinoGame.js
// import React, { useRef, useEffect, useState } from 'react';

// const DinoGame = () => {
//   const canvasRef = useRef(null);
//   const requestRef = useRef();
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Game constants
//   const GRAVITY = 0.6;
//   const JUMP_FORCE = -12;
//   const GAME_SPEED = 6;
//   const OBSTACLE_INTERVAL = 1500; // milliseconds

//   // Dinosaur properties
//   const dino = useRef({
//     x: 50,
//     y: 0,
//     width: 40,
//     height: 40,
//     dy: 0,
//     jumping: false,
//     grounded: false,
//   });

//   // Obstacles list
//   const obstacles = useRef([]);

//   // Timer for obstacle generation
//   const obstacleTimer = useRef(null);

//   // Score timer
//   const scoreTimer = useRef(null);

//   // Initialize game
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // Set canvas dimensions
//     const setCanvasSize = () => {
//       canvas.width = window.innerWidth > 800 ? 800 : window.innerWidth - 20;
//       canvas.height = 200;
//     };

//     setCanvasSize();
//     window.addEventListener('resize', setCanvasSize);

//     // Initialize dinosaur position
//     dino.current.y = canvas.height - dino.current.height - 10;

//     // Handle key presses
//     const handleKeyDown = (e) => {
//       if ((e.code === 'Space' || e.code === 'ArrowUp') && !dino.current.jumping && !gameOver) {
//         dino.current.dy = JUMP_FORCE;
//         dino.current.jumping = true;
//       }
//       if (e.code === 'KeyP') {
//         togglePause();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     // Start the game loop
//     requestRef.current = requestAnimationFrame(gameLoop);

//     // Start obstacle generation
//     obstacleTimer.current = setInterval(addObstacle, OBSTACLE_INTERVAL);

//     // Start score timer
//     scoreTimer.current = setInterval(() => {
//       setScore((prev) => prev + 1);
//     }, 100);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('resize', setCanvasSize);
//       cancelAnimationFrame(requestRef.current);
//       clearInterval(obstacleTimer.current);
//       clearInterval(scoreTimer.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [gameOver]);

//   // Toggle pause/resume
//   const togglePause = () => {
//     setIsPaused((prev) => !prev);
//     if (!isPaused) {
//       cancelAnimationFrame(requestRef.current);
//       clearInterval(obstacleTimer.current);
//       clearInterval(scoreTimer.current);
//     } else {
//       requestRef.current = requestAnimationFrame(gameLoop);
//       obstacleTimer.current = setInterval(addObstacle, OBSTACLE_INTERVAL);
//       scoreTimer.current = setInterval(() => {
//         setScore((prev) => prev + 1);
//       }, 100);
//     }
//   };

//   // Game loop
//   const gameLoop = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw ground
//     ctx.fillStyle = '#555';
//     ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

//     // Update and draw dinosaur
//     updateDino();
//     drawDino(ctx);

//     // Update and draw obstacles
//     updateObstacles();
//     drawObstacles(ctx);

//     // Check collisions
//     checkCollisions();

//     if (!gameOver && !isPaused) {
//       requestRef.current = requestAnimationFrame(gameLoop);
//     }
//   };

//   // Update dinosaur position
//   const updateDino = () => {
//     dino.current.dy += GRAVITY;
//     dino.current.y += dino.current.dy;

//     // Ground collision
//     if (dino.current.y + dino.current.height >= dino.current.grounded == true) {
//       dino.current.y =  canvasRef.current.height - dino.current.height - 10;
//       dino.current.dy = 0;
//       dino.current.jumping = false;
//     }
//   };

//   // Draw dinosaur
//   const drawDino = (ctx) => {
//     ctx.fillStyle = 'green';
//     ctx.fillRect(dino.current.x, dino.current.y, dino.current.width, dino.current.height);
//   };

//   // Add a new obstacle
//   const addObstacle = () => {
//     const canvas = canvasRef.current;
//     const obstacleHeight = Math.random() > 0.5 ? 30 : 20; // Cactus or bird
//     const obstacleWidth = obstacleHeight === 30 ? 20 : 30;
//     const yPosition = obstacleHeight === 30 ? canvas.height - obstacleHeight - 10 : canvas.height - obstacleHeight - 50;
//     obstacles.current.push({
//       x: canvas.width,
//       y: yPosition,
//       width: obstacleWidth,
//       height: obstacleHeight,
//       speed: GAME_SPEED,
//     });
//   };

//   // Update obstacles position
//   const updateObstacles = () => {
//     obstacles.current.forEach((obstacle, index) => {
//       obstacle.x -= obstacle.speed;
//       // Remove off-screen obstacles
//       if (obstacle.x + obstacle.width < 0) {
//         obstacles.current.splice(index, 1);
//       }
//     });
//   };

//   // Draw obstacles
//   const drawObstacles = (ctx) => {
//     ctx.fillStyle = 'red';
//     obstacles.current.forEach((obstacle) => {
//       ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
//     });
//   };

//   // Check for collisions
//   const checkCollisions = () => {
//     obstacles.current.forEach((obstacle) => {
//       if (
//         dino.current.x < obstacle.x + obstacle.width &&
//         dino.current.x + dino.current.width > obstacle.x &&
//         dino.current.y < obstacle.y + obstacle.height &&
//         dino.current.y + dino.current.height > obstacle.y
//       ) {
//         setGameOver(true);
//         cancelAnimationFrame(requestRef.current);
//         clearInterval(obstacleTimer.current);
//         clearInterval(scoreTimer.current);
//       }
//     });
//   };

//   // Restart the game
//   const restartGame = () => {
//     setGameOver(false);
//     setScore(0);
//     obstacles.current = [];
//     dino.current = {
//       x: 50,
//       y: canvasHeight() - 40 - 10,
//       width: 40,
//       height: 40,
//       dy: 0,
//       jumping: false,
//       grounded: true,
//     };
//     requestRef.current = requestAnimationFrame(gameLoop);
//     obstacleTimer.current = setInterval(addObstacle, OBSTACLE_INTERVAL);
//     scoreTimer.current = setInterval(() => {
//       setScore((prev) => prev + 1);
//     }, 100);
//   };

//   // Helper to get canvas height
//   const canvasHeight = () => {
//     return canvasRef.current ? canvasRef.current.height : 200;
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <h1>Chrome Dino Game in React</h1>
//       <canvas
//         ref={canvasRef}
//         style={{
//           border: '2px solid #000',
//           backgroundColor: '#fff',
//         }}
//       />
//       <div style={{ marginTop: '10px' }}>
//         <b>Score:</b> {score}
//       </div>
//       {gameOver && (
//         <div>
//           <h2>Game Over!</h2>
//           <button onClick={restartGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
//             Restart Game
//           </button>
//         </div>
//       )}
//       {!gameOver && (
//         <div style={{ marginTop: '10px' }}>
//           <button onClick={togglePause} style={{ padding: '5px 10px', fontSize: '14px' }}>
//             {isPaused ? 'Resume' : 'Pause'}
//           </button>
//         </div>
//       )}
//       <div style={{ marginTop: '10px' }}>
//         <p>Controls:</p>
//         <p>Press <b>Space</b> or <b>Arrow Up</b> to Jump</p>
//         <p>Press <b>P</b> to Pause/Resume</p>
//       </div>
//     </div>
//   );
// };

// export default DinoGame;








// src/DinoGame.js
import React, { useRef, useEffect, useState } from 'react';

const DinoGame = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Game constants
  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const GAME_SPEED = 6;
  const OBSTACLE_INTERVAL = 1500; // milliseconds

  // Dinosaur properties
  const dino = useRef({
    x: 50,
    y: 0,
    width: 40,
    height: 40,
    dy: 0,
    jumping: false,
    grounded: false,
  });

  // Obstacles list
  const obstacles = useRef([]);

  // Timer for obstacle generation
  const obstacleTimer = useRef(null);

  // Score timer
  const scoreTimer = useRef(null);

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth > 800 ? 800 : window.innerWidth - 20;
      canvas.height = 200;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize dinosaur position
    dino.current.y = canvas.height - dino.current.height - 10;

    // Handle key presses
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !dino.current.jumping && !gameOver) {
        dino.current.dy = JUMP_FORCE;
        dino.current.jumping = true;
      }
      if (e.code === 'KeyP') {
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Start the game loop
    requestRef.current = requestAnimationFrame(gameLoop);

    // Start obstacle generation
    obstacleTimer.current = setInterval(addObstacle, OBSTACLE_INTERVAL);

    // Start score timer
    scoreTimer.current = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(requestRef.current);
      clearInterval(obstacleTimer.current);
      clearInterval(scoreTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  // Toggle pause/resume
  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused) {
      cancelAnimationFrame(requestRef.current);
      clearInterval(obstacleTimer.current);
      clearInterval(scoreTimer.current);
    } else {
      requestRef.current = requestAnimationFrame(gameLoop);
      obstacleTimer.current = setInterval(addObstacle, OBSTACLE_INTERVAL);
      scoreTimer.current = setInterval(() => {
        setScore((prev) => prev + 1);
      }, 100);
    }
  };

  // Game loop
  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#555';
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    // Update and draw dinosaur
    updateDino();
    drawDino(ctx);

    // Update and draw obstacles
    updateObstacles();
    drawObstacles(ctx);

    // Check collisions
    checkCollisions();

    if (!gameOver && !isPaused) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };

  // Update dinosaur position
  const updateDino = () => {
    dino.current.dy += GRAVITY;
    dino.current.y += dino.current.dy;

    // Ground collision
    if (dino.current.y + dino.current.height >= dino.current.grounded == true) {
      dino.current.y =  canvasRef.current.height - dino.current.height - 10;
      dino.current.dy = 0;
      dino.current.jumping = false;
    }
  };

  // Draw dinosaur
  const drawDino = (ctx) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.current.x, dino.current.y, dino.current.width, dino.current.height);
  };

  // Add a new obstacle
  const addObstacle = () => {
    const canvas = canvasRef.current;
    const obstacleHeight = Math.random() > 0.5 ? 30 : 20; // Cactus or bird
    const obstacleWidth = obstacleHeight === 30 ? 20 : 30;
    const yPosition = obstacleHeight === 30 ? canvas.height - obstacleHeight - 10 : canvas.height - obstacleHeight - 50;
    obstacles.current.push({
      x: canvas.width,
      y: yPosition,
      width: obstacleWidth,
      height: obstacleHeight,
      speed: GAME_SPEED,
    });
  };

  // Update obstacles position
  const updateObstacles = () => {
    obstacles.current.forEach((obstacle, index) => {
      obstacle.x -= obstacle.speed;
      // Remove off-screen obstacles
      if (obstacle.x + obstacle.width < 0) {
        obstacles.current.splice(index, 1);
      }
    });
  };

  // Draw obstacles
  const drawObstacles = (ctx) => {
    ctx.fillStyle = 'red';
    obstacles.current.forEach((obstacle) => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  };

  // Check for collisions
  const checkCollisions = () => {
    obstacles.current.forEach((obstacle) => {
      if (
        dino.current.x < obstacle.x + obstacle.width &&
        dino.current.x + dino.current.width > obstacle.x &&
        dino.current.y < obstacle.y + obstacle.height &&
        dino.current.y + dino.current.height > obstacle.y
      ) {
        setGameOver(true);
        cancelAnimationFrame(requestRef.current);
        clearInterval(obstacleTimer.current);
        clearInterval(scoreTimer.current);
      }
    });
  };

  // Restart the game
  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    obstacles.current = [];
    dino.current = {
      x: 50,
      y: canvasHeight() - 40 - 10,
      width: 40,
      height: 40,
      dy: 0,
      jumping: false,
      grounded: true,
    };
    requestRef.current = requestAnimationFrame(gameLoop);
    obstacleTimer.current = setInterval(addObstacle, OBSTACLE_INTERVAL);
    scoreTimer.current = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 100);
  };

  // Helper to get canvas height
  const canvasHeight = () => {
    return canvasRef.current ? canvasRef.current.height : 200;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Chrome Dino Game in React</h1>
      <canvas
        ref={canvasRef}
        style={{
          border: '2px solid #000',
          backgroundColor: '#fff',
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <b>Score:</b> {score}
      </div>
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <button onClick={restartGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Restart Game
          </button>
        </div>
      )}
      {!gameOver && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={togglePause} style={{ padding: '5px 10px', fontSize: '14px' }}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      )}
      <div style={{ marginTop: '10px' }}>
        <p>Controls:</p>
        <p>Press <b>Space</b> or <b>Arrow Up</b> to Jump</p>
        <p>Press <b>P</b> to Pause/Resume</p>
      </div>
    </div>
  );
};

export default DinoGame;
