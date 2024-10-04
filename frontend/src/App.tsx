import { useEffect, useState } from "react"

const App = () => {
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
        setBoard(data.board);
        setCurrentPlayer(data.currentPlayer);
        setIsGameOver(data.isGameOver);
        setResult(data.result);
      })
      .catch((error) => console.error("Error fetching board: ", error));
  };

  return (
    <div>
      <h1>React & C# Tic Tac Toe</h1>
    </div>
  )
}

export default App
