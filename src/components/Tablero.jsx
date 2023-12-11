import CuadradoDelTablero from './CuadradoDelTablero'

const Tablero = ({ squares, guesses, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <CuadradoDelTablero
          key={index}
          value={value}
          isGuessed={guesses.includes(index)}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  )
}

export default Tablero
