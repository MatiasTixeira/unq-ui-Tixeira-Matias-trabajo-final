import Square from '../Tablero/CuadradoDelTablero'

const Board = ({ squares, guesses, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          isGuessed={guesses.includes(index)}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  )
}

export default Board
