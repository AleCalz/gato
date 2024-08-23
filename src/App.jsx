import { useState } from "react";
const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, updateBoard, idx, isSelected }) => {
  const classname = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(idx);
  };
  return (
    <div onClick={handleClick} className={classname}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  //estado para tablero se act
  const [board, setBoard] = useState(Array(9).fill(null));
  //nuevo estato para conocer el turno
  const [turn, setTurn] = useState(TURNS.X);
  //null = no hay ganador, false = empate, true = ganador
  const [winner, setWinner] = useState(null);

  const checkWinner = (boarToCheck) => {
    //revisar todas la combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boarToCheck[a] && // 0 => X u O
        boarToCheck[a] === boarToCheck[b] &&
        boarToCheck[a] === boarToCheck[c]
      ) {
        // REGRESAMOS AL GANADOR
        return boarToCheck[a]; // X u O
      }
    }
    //si no hay ganador
    return null;
  };

  const resetGame = () => {
    //resetear todo a sus valores iniciales

    //tablero
    setBoard(Array(9).fill(null));
    //turno
    setTurn(TURNS.X);
    //ganador
    setWinner(null);
  };

  const updateBoard = (idx) => {
    // nunca mutar las props
    //no act la posicion si ya existe algo
    if (board[idx] || winner) return;

    //act tablero
    const newBoard = [...board];
    newBoard[idx] = turn; // X u O
    setBoard(newBoard);
    //act turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //revisamos si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner); //act el estado del ganador (ASINCRONO)
      // alert(`El ganador es ${newWinner}`);
    }
  };
  return (
    <main className="board">
      <h1>Juego del Gato</h1>
      <button onClick={resetGame}>Reinicia el Juego</button>
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

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Gano: "}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Emprezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
