import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  let status;

  const calculateWinner = (squares) => {
    for (let i = 0; i < 3; i++) {
      let rowIndex = i + 2 * i;
      if (
        squares[i] &&
        squares[i] === squares[i + 3] &&
        squares[i] === squares[i + 6]
      ) {
        setWinner(squares[i]);
        return;
      }
      if (
        squares[rowIndex] &&
        squares[rowIndex] === squares[rowIndex + 1] &&
        squares[rowIndex] === squares[rowIndex + 2]
      ) {
        setWinner(squares[rowIndex]);
        return;
      }
    }
    if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8]) {
      setWinner(squares[0]);
      return;
    }
    if (squares[2] && squares[2] === squares[4] && squares[2] === squares[6]) {
      setWinner(squares[2]);
      return;
    }
  };

  const handleClick = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[index] = isXNext ? "X" : "0";
    setIsXNext(!isXNext);
    setSquares(squaresCopy);
    calculateWinner(squaresCopy);
  };

  const renderSquare = (index) => {
    return (
      <Square value={squares[index]} onSquareClick={() => handleClick(index)} />
    );
  };

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? "X" : "0"}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
}
