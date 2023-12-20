import { useState } from "react";

function calculateWinner(squares) {
  const linesWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < linesWin.length; index++) {
    const [a, b, c] = linesWin[index];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function isEndGame(squares) {
  let isEmpty;

  for (let index = 0; index < squares.length; index++) {
    const element = squares[index];
    if (element === null || element === "") {
      isEmpty = true;
      break;
    }
  }

  if (isEmpty) {
    return false;
  } else {
    return true;
  }
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const playAgainButton = document.querySelector('.play-again');

  function handleClick(indexCell) {
    console.log(indexCell);
    // Se è già valorizzata la posizione della board allora non faccio nulla
    // Oppure se finisco il gioco per vittoria
    if (squares[indexCell] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[indexCell] = "X";
    } else {
      nextSquares[indexCell] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const endgame = isEndGame(squares);
  let status;

  if (winner) {
    status = "Winner is : " + winner;
  } else {
    if (endgame) {
      status = "End Game!";
    } else {
      status = "Next player : " + (xIsNext ? "X" : "O");
    }
  }

  function playAgain() {
    location.reload();
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      {(endgame || winner) &&
        <>
          <br></br>
          <button onClick={playAgain} style={{ marginLeft: "10px" }}>Play Again</button>
        </>
      }
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCorrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCorrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCorrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
