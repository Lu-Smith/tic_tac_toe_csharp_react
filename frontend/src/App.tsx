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
        console.log(data);
        setBoard(data.board);
        setCurrentPlayer(data.currentPlayer);
        setIsGameOver(data.isGameOver);
        setResult(data.result);
      })
      .catch((error) => console.error("Error fetching board: ", error));
  };

  const handleMove = (index: number) => {
    console.log("Move made at index:", index); // Check if this logs when you click
    if (isGameOver || board[index]) return; 
    // ... rest of your code
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
    <div>
      <h1>React & C# Tic Tac Toe</h1>
      <p>Current Player: {currentPlayer}</p>
      <p>Game Status: {isGameOver ? result : "In Progress"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleMove(index)}
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              fontSize: "24px",
              // cursor: isGameOver || cell ? "not-allowed" : "pointer",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
        disabled={!isGameOver}
      >
        Reset Game
      </button>
    </div>
  )
}

export default App
