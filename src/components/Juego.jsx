import React, { useEffect, useState, useRef } from "react"
import EjesDelTablero from "./Tablero/EjesDelTablero"
import Tablero from "./Tablero/Tablero"
import FuncionesDeAyuda from "./FuncionesDeAyuda"
import {tieneSuficientesBloquesParaDesplegar, obtenerBloquesOcupables, estaOcupadoPorOtroBarco, obtenerBloqueOcupableAleatorio, generarIndiceFilaYColumnaAleatorio, obtenerNombreBarcoPorCoordenadas, sonArraysIguales} from "./FuncionesDeAyuda"
import './Juego.css'
import { barcos, posiblesDisposiciones, posiblesJUgadores, tiroEsquivado } from "./Informacion"
import MenuSuperior from "./MenuSuperior"

import StartPage from "./startPage"
import Summary from "./Summary"


const Juego = () => {
  


  return (
    <div>
        <MenuSuperior />
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
