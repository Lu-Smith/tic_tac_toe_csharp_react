import React from 'react';

interface GameProps {
  board: string[];  
  handleMove: (index: number) => void;  
}

const Game: React.FC<GameProps> = ({board, handleMove}) => {
  return (
    <div className="grid">
      {board.map((cell, index) => (
        <div
          key={index}
          onClick={() => handleMove(index)}
          className="cell"
        >
          <span>{cell}</span>
        </div>
      ))}
    </div>
  )
}

export default Game;