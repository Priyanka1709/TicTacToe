import Board from "./Board";
import { useState, useCallback } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isPlayWithBot, setIsPlayWithBot] = useState(true);

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

  const handlePlay = useCallback((squares) => {
    const nextHistory = [...history];
    nextHistory.push(squares);
    setMove((move) => move + 1);
    setHistory(nextHistory);
    calculateWinner(squares);
  });

  const handleGameModeChange = (e) => {
    setIsPlayWithBot(e.target.value === "playwithbot" ? true : false);
    setHistory([Array(9).fill(null)]);
    setMove(0);
    setWinner(null);
  };

  const onMoveButtonClick = (index) => {
    setMove(index);
    setHistory(history.slice(0, index + 1));
    setWinner(null);
  };

  const moves = history.map((squares, index) => {
    if (index === 0) {
      return (
        <li>
          <button key={index} onClick={() => onMoveButtonClick(index)}>
            Go to start
          </button>
        </li>
      );
    } else {
      if (isPlayWithBot ? index % 2 === 0 : true) {
        return (
          <li>
            <button key={index} onClick={() => onMoveButtonClick(index)}>
              Go to move #{index}
            </button>
          </li>
        );
      }
    }
  });

  const isXNext = move % 2 === 0 ? true : false;
  return (
    <div className="game">
      <div className="game-mode">
        <label>
          <input
            type="radio"
            value="playwithbot"
            checked={isPlayWithBot === true}
            onChange={handleGameModeChange}
          />
          Play with bot
        </label>
        <label>
          <input
            type="radio"
            value="playwithfriend"
            checked={isPlayWithBot === false}
            onChange={handleGameModeChange}
          />
          Play with friend
        </label>
      </div>
      <div className="game-actions">
        <div className="game-board">
          <Board
            squares={squares}
            onPlay={handlePlay}
            winner={winner}
            isXNext={isXNext}
            isPlayWithBot={isPlayWithBot}
          />
        </div>
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>
    </div>
  );
}
