import { useEffect, useState } from "react"

const App = () => {

  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('http://localhost:5223/api/test')
    .then((response) => response.text())
    .then((data) => setApiResponse(data))
    .catch((error) => console.error("Error fetching API: ", error));
  }, []);

  return (
    <div>
      <h1>React & C# Tic Tac Toe</h1>
      <p>API Response: {apiResponse}</p>
    </div>
  )
}

export default App
