import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const [winner, setWinner] = useState(null);

  const squares = history[move];

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

  const handlePlay = (squares) => {
    const nextHistory = [...history];
    nextHistory.push(squares);
    setMove((move) => move + 1);
    setHistory(nextHistory);
    calculateWinner(squares);
  };

  const onMoveButtonClick = (index) => {
    setMove(index);
    setHistory(history.slice(0, index + 1));
    setWinner(null);
  };

  const moves = history.map((squares, index) => {
    if (index === 0) {
      return (
        <li key={index}>
          <button onClick={() => onMoveButtonClick(index)}>Go to start</button>
        </li>
      );
    } else {
      return (
        <li key={index}>
          <button onClick={() => onMoveButtonClick(index)}>
            Go to move #{index}
          </button>
        </li>
      );
    }
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onPlay={handlePlay}
          isXNext={move % 2 === 0 ? true : false}
          winner={winner}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
