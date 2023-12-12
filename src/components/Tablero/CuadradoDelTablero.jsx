import React from "react"
import { posiblesJUgadores, tiroEsquivado } from "../Informacion.js"

const CuadradoDelTablero = ({ onClick, verificarOcupacion, propietarioTablero, divId }) => {

  const { estaOcupada, nombreBarco, barcoHundido, haSidoAtacada } = verificarOcupacion
  let bloqueImpactoFallido = false
  let claseAtaqueTablero = ""

  if (nombreBarco === tiroEsquivado) {
    bloqueImpactoFallido = true
    claseAtaqueTablero = "fallido"
  } else if (barcoHundido) {
    claseAtaqueTablero = "barco-hundido"
  } else if (!barcoHundido && haSidoAtacada) {
    claseAtaqueTablero = "impacto"
  } else if (nombreBarco !== tiroEsquivado && estaOcupada) {
    claseAtaqueTablero = propietarioTablero === posiblesJUgadores.computadora ? "" : nombreBarco
  }

  return (
    <div
      id={divId}
      onClick={() => {
        if (barcoHundido || haSidoAtacada || bloqueImpactoFallido) { return }
        onClick()
      }}
      disabled={barcoHundido || haSidoAtacada || bloqueImpactoFallido}
      className={`cuadrado-tablero ${claseAtaqueTablero}`}
    ></div>
  )
}

CuadradoDelTablero.displayName = "CuadradoDelTablero"

export default CuadradoDelTablero;
