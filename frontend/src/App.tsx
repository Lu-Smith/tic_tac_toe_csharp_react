import { useEffect, useState } from "react";
import './App.css';
import Footer from "./components/Footer";
import Game from "./components/Game";

const App: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill("")); 
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = () => {
    fetch("http://localhost:5223/api/game/board")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBoard(data.board);
        setCurrentPlayer(data.currentPlayer);
        setIsGameOver(data.isGameOver);
        setResult(data.result);
      })
      .catch((error) => console.error("Error fetching board: ", error));
  };

  const handleMove = (index: number) => {
    console.log("Move made at index:", index); 
    if (isGameOver || board[index] != "-") return; 
    
    fetch(`http://localhost:5223/api/game/move?index=${index}`, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Move response data:", data); 
        setBoard(data.board);
        setCurrentPlayer(data.currentPlayer);
        setIsGameOver(data.isGameOver);
        setResult(data.result);
      })
      .catch((error) => console.error("Error making move: ", error));
  };

  const resetGame = () => {
    fetch("http://localhost:5223/api/game/reset", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        setBoard(data.board);
        setCurrentPlayer(data.currentPlayer);
        setIsGameOver(data.isGameOver);
        setResult(data.result);
      })
      .catch((error) => console.error("Error resetting game: ", error));
  };

  return (
    <div className="App">
      <h1><span>Tic Tac Toe</span></h1>
      <p>Current Player: <span>{currentPlayer}</span></p>
      <p>Game Status: <span>{isGameOver ? result : "In Progress"}</span></p>
      <Game board={board} handleMove={handleMove} />
      <button
        onClick={resetGame}
        disabled={!isGameOver}
      >
        Reset Game
      </button>
      <Footer />
    </div>
  )
}

export default App
