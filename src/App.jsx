const TURNS = {
  X: "x",
  O: "o",
};

//tablero
const board = Array(9).fill(null);

const Square = ({ children, updateBoard, idx }) => {
  return <div className="square">{children}</div>;
};

function App() {
  return (
    <main className="board">
      <h1>Juego del Gato</h1>
      <section className="game">
        {board.map((cell, idx) => {
          return (
            <Square key={idx} idx={idx}>
              {idx}
            </Square>
          );
        })}
      </section>
    </main>
  );
}

export default App;
