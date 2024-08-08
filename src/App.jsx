import { useState } from "react";
const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, updateBoard, idx, isSelected }) => {
  const classname = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard();
  };
  return (
    <div onClick={handleClick} className={classname}>
      {children}
    </div>
  );
};

function App() {
  //estado para tablero se act
  const [board, setBoard] = useState(Array(9).fill(null));

  //nuevo estato para conocer el turno
  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = () => {
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  };
  return (
    <main className="board">
      <h1>Juego del Gato</h1>
      <section className="game">
        {board.map((cell, idx) => {
          return (
            <Square key={idx} idx={idx} updateBoard={updateBoard}>
              {board[idx]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
