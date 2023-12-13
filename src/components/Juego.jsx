import React, { useEffect, useState } from "react"
import EjesDelTablero from "./Tablero/EjesDelTablero"
import Tablero from "./Tablero/Tablero"
import {tieneSuficientesBloquesParaDesplegar, obtenerBloquesOcupables, estaOcupadoPorOtroBarco, obtenerBloqueOcupableAleatorio, generarIndiceFilaYColumnaAleatorio, obtenerNombreBarcoPorCoordenadas, sonArraysIguales} from "./FuncionesDeAyuda"
import './Juego.css'
import MenuSuperior from "./MenuSuperior"
import { barcos, posiblesDisposiciones, posiblesJUgadores, tiroEsquivado } from "./Informacion"


const Juego = () => {
  // Estados comunes
  const [juegoAbierto, setJuegoAbierto] = useState(false)
  const [barcoSeleccionadoParaColocar, setBarcoSeleccionadoParaColocar] = useState(null)
  const [jugadorActual, setJugadorActual] = useState(posiblesJUgadores.jugador)
  const [juegoComenzado, setJuegoComenzado] = useState(false)

  // Estados del jugador
  const [barcosDisponiblesJugador, setBarcosDisponiblesJugador] = useState(barcos)
  const [ejeSeleccionadoJugador, setEjeSeleccionadoJugador] = useState(posiblesDisposiciones.horizontal)
  const [barcosDesplegadosJugador, setBarcosDesplegadosJugador] = useState([])

  // Estados de la computadora
  const [barcosDisponiblesComputadora, setBarcosDisponiblesComputadora] = useState(barcos)
  const [barcosDesplegadosComputadora, setBarcosDesplegadosComputadora] = useState([])

  useEffect(() => {
    if (juegoComenzado && jugadorActual === posiblesJUgadores.computadora) {
      setTimeout(() => {
        atacarTableroDelJugadorPorComputadora()
      }, [200])
    }
  }, [juegoComenzado, jugadorActual])

  useEffect(() => {
    if (juegoComenzado) {
      verificarGanador(barcosDesplegadosComputadora, posiblesJUgadores.computadora)
      verificarGanador(barcosDesplegadosJugador, posiblesJUgadores.jugador)
    }
  }, [juegoComenzado, barcosDesplegadosComputadora, barcosDesplegadosJugador])

  const verificarGanador = (barcos, jugador) => {
    const { todosHundidos, ganador } = obtenerGanador(barcos, jugador)
    if (todosHundidos) {
    }
  }

  const obtenerGanador = (barcosDesplegados, propietarioTablero) => {
    let ganador = ""
    let todosHundidos = false
    if (barcosDesplegados && barcosDesplegados.length > 0) {
      let barcosHundidosNumero = 0
      barcosDesplegados.forEach((barco) => {
        if (barco.estaBarcoHundido) {
          barcosHundidosNumero++
        }
      })

      if (barcosHundidosNumero === barcos.length) {
        todosHundidos = true
        if (propietarioTablero === posiblesJUgadores.jugador) {
          ganador = "Computadora"
        } else {
          ganador = "Jugador"
        }
      }
    }
    return { todosHundidos, ganador }
  }


  const reiniciarJuego = () => {
    setBarcosDisponiblesJugador(barcos)
    setBarcosDisponiblesComputadora(barcos)
    setBarcoSeleccionadoParaColocar(null)
    setJugadorActual(posiblesJUgadores.jugador)
    setJuegoComenzado(false)
    setEjeSeleccionadoJugador(EJES.horizontal)
    setBarcosDesplegadosJugador([])
    setBarcosDesplegadosComputadora([])
  }

  const atacarTableroDelJugadorPorComputadora = () => {
    const { indiceFila, indiceColumna } = generarIndiceFilaYColumnaAleatorio()
    const { nombreBarco } = estaOcupadoPorOtroBarco(
      barcosDisponiblesJugador,
      `${indiceFila}${indiceColumna}`
    )
    manejarAtaqueConMisilEnTablero(indiceFila, indiceColumna, nombreBarco)
  }

  const manejarClicEnCasillaDelTablero = ({ indiceFila, indiceColumna, barcoClickeado }) => {
    if (juegoComenzado) {
      if (jugadorActual === posiblesJUgadores.jugador) {
        manejarAtaqueConMisilEnTablero(indiceFila, indiceColumna, barcoClickeado)
      }
      return "a"
    }
    if (!juegoComenzado && barcosDesplegadosJugador.length === barcos.length) { 
       return "b"
    } else {
      if (barcoSeleccionadoParaColocar) {
        const esHorizontal = ejeSeleccionadoJugador === posiblesDisposiciones.horizontal
        if (
          tieneSuficientesBloquesParaDesplegar( esHorizontal, barcoSeleccionadoParaColocar.longitudBarco, indiceFila, indiceColumna)
        ) {
          const bloquesOcupados = obtenerBloquesOcupables( esHorizontal, indiceFila, indiceColumna, barcoSeleccionadoParaColocar.longitudBarco)
          if ( estaOcupadoPorOtroBarco(barcosDesplegadosJugador, bloquesOcupados).estaOcupado ) {
            return "c"
          }
          const barcoDesplegableObj = { 
            nombreBarco: barcoSeleccionadoParaColocar.nombre,
            longitudBarco: barcoSeleccionadoParaColocar.longitudBarco,
            bloquesOcupados,
            esHorizontal,
            jugadorActual,
            bloquesAtacados: [],
            estaBarcoHundido: false
          }
          setBarcosDesplegadosJugador([...barcosDesplegadosJugador, barcoDesplegableObj])
          const nuevosBarcosDisponiblesJugador = barcosDisponiblesJugador.filter((barco) => barco.nombre !== barcoSeleccionadoParaColocar.nombre)
          setBarcosDisponiblesJugador(nuevosBarcosDisponiblesJugador)
          setBarcoSeleccionadoParaColocar(null)
        } else {
          return "d"
        }
      } else {
        return "e"
      }
    }
  }

  const manejarInicioDeJuego = () => {
    if (juegoComenzado) {
      reiniciarJuego()
    } else {
      setJuegoComenzado(true)
      desplegarBarcosParaComputadora()
    }
  }

  const desplegarBarcosParaComputadora = () => {
    let barcosTemporales = [...barcosDisponiblesComputadora]
    let arregloTemporalesDesplegados = []
    while (barcosTemporales?.length > 0) {
      const esHorizontal = Math.random() < 0.5 ? true : false
      let bloque = obtenerBloqueOcupableAleatorio(barcosTemporales[0], esHorizontal)
      if (estaOcupadoPorOtroBarco(arregloTemporalesDesplegados, bloque).estaOcupado) {
        bloque = obtenerBloqueOcupableAleatorio(barcosTemporales[0], esHorizontal)
      } else {
        const barcoDesplegableObj = {
          nombreBarco: barcosTemporales[0].nombre,
          longitudBarco: barcosTemporales[0].longitudBarco,
          bloquesOcupados: bloque,
          esHorizontal,
          jugadorActual,
          bloquesAtacados: [],
          estaBarcoHundido: false
        }
        arregloTemporalesDesplegados = [...arregloTemporalesDesplegados, barcoDesplegableObj]
        barcosTemporales.shift()
      }
    }
    if (arregloTemporalesDesplegados.length === 4) {
      setBarcosDisponiblesComputadora([])
      setBarcosDesplegadosComputadora(arregloTemporalesDesplegados)
      empezarAtaqueAhora()
    }
  }

  const manejarAtaqueConMisilEnTablero = (filaIndice, columnaIndice, naveClickeada) => {
    const coordenadasXY = `${filaIndice}${columnaIndice}`
    let nuevoArregloDesplegado = []
    const barcosTableroDestino =
    jugadorActual === posiblesJUgadores.player
        ? barcosDesplegadosComputadora
        : barcosDisponiblesJugador
    let nombreNaveDestino = naveClickeada

    if (jugadorActual === posiblesJUgadores.computer) {
      nombreNaveDestino = obtenerNombreBarcoPorCoordenadas( barcosDisponiblesJugador, coordenadasXY)
    }
    if (nombreNaveDestino !== "") {
      nuevoArregloDesplegado = barcosTableroDestino.map((nave) => {
        if (nave?.shipName === nombreNaveDestino) {
          if (nave.attackedBlocks.length > 0) {
            if (nave.attackedBlocks.includes(coordenadasXY)) { return }
            const nuevosBloquesAtacados = [...nave.attackedBlocks, coordenadasXY]
            const esNaveHundida = sonArraysIguales(
              nuevosBloquesAtacados,
              nave.occupiedBlocks
            )
            return {
              ...nave,
              attackedBlocks: nuevosBloquesAtacados,
              isShipSunk: esNaveHundida
            }
          } else {
            return {
              ...nave,
              attackedBlocks: [`${filaIndice}${columnaIndice}`],
              isShipSunk: false
            }
          }
        } else {
          return nave
        }
      })
    } else {
      nuevoArregloDesplegado = [
        ...barcosTableroDestino,
        { shipName: tiroEsquivado, attackedBlocks: [`${filaIndice}${columnaIndice}`] }
      ]
    }
    if (jugadorActual === jugadorActual.player) {
      setBarcosDesplegadosComputadora(nuevoArregloDesplegado)
    } else {
      setBarcosDesplegadosJugador(nuevoArregloDesplegado)
    }
    setCurrentPlayer(
      jugadorActual === jugadorActual.player
        ? jugadorActual.computer
        : jugadorActual.player
    )
  }
  if (!juegoAbierto) {
    setJuegoAbierto(true)
  }
  
  return (
    <div>
      <div className="battleship__stage">
      <div className="battleship__content">
        <div className="battleship__content--board">
          <div className="battleship__content--board--wrapper">
            <h1>Tablero del Jugador</h1>
            <div className="battleship__content--board--container">
              <EjesDelTablero direction="row" />
              <EjesDelTablero direction="column" />
              <Tablero
                haComenzadoElJuego={juegoComenzado}
                selectedShipToPlace={barcoSeleccionadoParaColocar}
                onClickBoradSquare={manejarClicEnCasillaDelTablero}
                barcosDesplegados={barcosDisponiblesJugador} 
                propietarioTablero={posiblesJUgadores.player}
              />
            </div>
          </div>
        </div>
        <div className="battleship__content--board">
          {!juegoComenzado 
          ? null
          : (
            <div className="battleship__content--board--wrapper">
              <h1>Tablero de la Computadora</h1>
              <div className="battleship__content--board--container">
                <EjesDelTablero direction="row" />
                <EjesDelTablero direction="column" />
                <Tablero
                  haComenzadoElJuego={juegoComenzado}
                  //selectedShipToPlace={barcoSeleccionadoParaColocar}
                  onClickCeldaTablero ={manejarClicEnCasillaDelTablero}
                  barcosDesplegados={barcosDesplegadosComputadora}
                  propietarioTablero={posiblesJUgadores.computer}
                /> 
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Juego
