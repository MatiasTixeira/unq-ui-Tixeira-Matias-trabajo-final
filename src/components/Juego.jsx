import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Tablero from './Tablero'
import './Juego.css'

const Juego = () => {
  const [tablero, setTablero] = useState(Array(100).fill(null))
  const [barcos, setBarcos] = useState(generateRandomShips())
  const [guesses, setGuesses] = useState([])

  const [tableroPj, setTableroPj] = useState(Array(100).fill(null))
  const [barcosPj, setBarcosPj] = useState(generateRandomShips())
  const [guessesPj, setGuessesPj] = useState([])

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
    setTablero(Array(100).fill(null))
    setBarcos(generateRandomShips())
    setGuesses([])
  }

  const ataqueDeLaCompuitadora = () => {
    index = Math.floor(Math.random() * 100) + 1
    if (guessesPj.includes(index)) {return}
    setGuesses([...guessesPj, index])
    if (barcosPj.includes(index)) {
      setTableroPj((prevBoard) => prevBoard.map((value, i) => (i === index ? 'barco' : value)))
      if (isAllShipsSunk()) { ('NOOOOOOOOOOOO! Han hundido todos tus barcos. Perdiste!') }
    } else {
      setTableroPj((prevBoard) =>
        prevBoard.map((value, i) => (i === index ? 'agua' : value))
      )
    }
  }

  const handleSquareClick = (index) => {
    // Verifica si el índice ya ha sido adivinado
    if (guesses.includes(index)) {
      return
    }
    // Agrega el índice a las adivinanzas del jugador
    setGuesses([...guesses, index])
    // Verifica si la adivinanza es un golpe o un fallo
    if (barcos.includes(index)) {
    // Es un golpe, actualiza el estado del tablero
      setTablero((prevBoard) =>
        prevBoard.map((value, i) => (i === index ? 'barco' : value))
      )
      // Verifica si todos los barcos han sido hundidos
      if (isAllShipsSunk()) {
        alert('¡Felicidades! Has hundido todos los barcos. ¡Ganaste!')
      // Puedes reiniciar el juego aquí si lo deseas
      }
      ataqueDeLaCompuitadora()
    } else {
    // Es un fallo, puedes manejarlo de otra manera si lo prefieres
      setTablero((prevBoard) =>
        prevBoard.map((value, i) => (i === index ? 'agua' : value))
      )
      ataqueDeLaCompuitadora()
    }
  }

  function isAllShipsSunk () {
    // Verifica si todos los barcos han sido hundidos
    return barcos.every(ship => guesses.includes(ship))
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
            <div className='text-jugadores'>
              <h2> Jugador 1 </h2>
              <h2> La Maquina </h2>
            </div>
            <div className='tableros'>
              <Tablero squares={tableroPj} guesses={guessesPj} />
              <Tablero squares={tablero} guesses={guesses} onClick={handleSquareClick} />
            </div>
            <br></br>
            <button onClick={handleRestartClick}>Reiniciar Juego</button>
        </div>
    </div>
  )
}

export default Juego
