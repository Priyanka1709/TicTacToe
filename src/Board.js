import { useEffect } from "react";
import Square from "./Square";

export default function Board({
  squares,
  isXNext,
  onPlay,
  winner,
  isPlayWithBot,
}) {
  let status;

  useEffect(() => {
    if (!isXNext && isPlayWithBot) {
      const emptySquares = squares
        .map((square, index) => {
          return square === null ? index : null;
        })
        .filter((index) => index !== null);
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const nextSquares = [...squares];
      nextSquares[emptySquares[randomIndex]] = "0";
      onPlay(nextSquares);
    }
  }, [isXNext]);

  const handleClick = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? "X" : "0";
    onPlay(nextSquares);
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
