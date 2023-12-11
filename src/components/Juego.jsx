import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Board from '../components/Board'
import './Juego.css'

const Juego = () => {
  const [board, setBoard] = useState(Array(100).fill(null))
  const [barcos, setBarcos] = useState(generateRandomShips())
  const [guesses, setGuesses] = useState([])

  // Función para generar ubicaciones aleatorias de barcos
  function generateRandomShips () {
    const barcos = []
    const longitudesDeLosBarcos = [5, 4, 3, 2] // Longitudes de los barcos
    for (const length of longitudesDeLosBarcos) {
      let barco
      do {
        barco = generateRandomShip(length)
      } while (isShipOverlap(barco, barcos))

      barcos.push(...barco)
    }
    return barcos
  }

  function generateRandomShip (length) {
    const isVertical = Math.random() < 0.5
    const barco = []
    const start = Math.floor(Math.random() * 100)
    for (let i = 0; i < length; i++) {
      const position = isVertical ? start + i * 10 : start + i
      barco.push(position)
    }
    return barco
  }

  function isShipOverlap (nuevoBarco, barcosExistentes) {
    for (const position of nuevoBarco) {
      if (barcosExistentes.includes(position)) {
        return true // Hay solapamiento
      }
    }
    return false // No hay solapamiento
  }

  const handleRestartClick = () => {
    setBoard(Array(100).fill(null))
    setBarcos(generateRandomShips())
    setGuesses([])
  }

  const handleSquareClick = (index) => {
    // Verifica si el índice ya ha sido adivinado
    if (guesses.includes(index)) {
      // El jugador ya ha hecho esta adivinanza, no hagas nada
      return
    }
    // Agrega el índice a las adivinanzas del jugador
    setGuesses([...guesses, index])
    // Verifica si la adivinanza es un golpe o un fallo
    if (barcos.includes(index)) {
    // Es un golpe, actualiza el estado del tablero
      setBoard((prevBoard) =>
        prevBoard.map((value, i) => (i === index ? 'X' : value))
      )
      // Verifica si todos los barcos han sido hundidos
      if (isAllShipsSunk()) {
        alert('¡Felicidades! Has hundido todos los barcos. ¡Ganaste!')
      // Puedes reiniciar el juego aquí si lo deseas
      }
    } else {
    // Es un fallo, puedes manejarlo de otra manera si lo prefieres
      setBoard((prevBoard) =>
        prevBoard.map((value, i) => (i === index ? 'agua' : value))
      )
    // Puedes llevar un contador de intentos y mostrarlo al jugador
    // Si deseas reiniciar el juego después de cierto número de intentos, puedes hacerlo aquí
    }
  }

  function isAllShipsSunk () {
    // Verifica si todos los barcos han sido hundidos
    return barcos.every((ship) => guesses.some((guess) => guess === ship))
  }

  return (
    <div>
        <div className='topMenu'>
            <nav>
            <ul>
                <li><p> BATALLA NAVAL </p></li>
                <li><NavLink to="/"><a className="Reglas" href="pagina submain2.html">REGLAS</a></NavLink></li>
                <li><NavLink to="/game"><a className="JUGAR" href="contactos.html">JUGAR </a></NavLink></li>
            </ul>
            </nav>
        </div>
        <div className="App">
            <h1>Batalla Naval</h1>
            <Board squares={board} guesses={guesses} onClick={handleSquareClick} />
            <br></br>
            <button onClick={handleRestartClick}>Reiniciar Juego</button>
        </div>
    </div>
  )
}

export default Juego
