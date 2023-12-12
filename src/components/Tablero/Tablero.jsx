import React from "react"
import CuadradoDelTablero from "./CuadradoDelTablero"
import { barcos, posiblesJUgadores, tiroEsquivado } from "../Informacion.js"
import 'Tablero.css'

const Tablero = ({ onClickCeldaTablero, barcosDesplegados, propietarioTablero, haComenzadoElJuego
}) => {

    // Verifica si una celda está ocupada por un barco
    const verificarOcupacion = (indiceFila, indiceColumna) => {
        let estaOcupada = false
        let nombreBarco = ""
        let haSidoAtacada = false
        let barcoHundido = false
        const indiceFilaColumnaActual = `${indiceFila}${indiceColumna}`

        barcosDesplegados && barcosDesplegados.forEach((barco) => {
            if (!barco?.nombreBarco) {  //verdadera si nombreBarco es undefined o null
                return
            }
            
            if (barco?.nombreBarco === tiroEsquivado && indiceFilaColumnaActual === barco.bloquesAtacados.join()){
                nombreBarco = tiroEsquivado
            } 
            
            else if (barco?.nombreBarco !== tiroEsquivado && barco.bloquesOcupados.includes(indiceFilaColumnaActual)){
                estaOcupada = true
                nombreBarco = barco?.nombreBarco
                barcoHundido = barco.barcoHundido ? true : false
                haSidoAtacada = barco.bloquesAtacados.includes(indiceFilaColumnaActual)
                    ? true
                    : false
            }
        })
        return { estaOcupada, nombreBarco, barcoHundido, haSidoAtacada }
    }

    return (
        <div className={`tablero ${haComenzadoElJuego && propietarioTablero === posiblesJUgadores.jugador
                    ? "bloquear-tablero"
                    : ""
                }`} >
            {barcos.map((fila, indiceColumna) => {
                return fila.map((_, indiceFila) => {
                    return (
                        <CuadradoDelTablero
                            divId={`celda_${indiceFila}_${indiceColumna}`}
                            onClick={() =>
                                onClickCeldaTablero({
                                    indiceFila,
                                    indiceColumna,
                                    barcoClickeado: verificarOcupacion(indiceFila, indiceColumna).nombreBarco || ""
                                })
                            }
                            propietarioTablero={propietarioTablero}
                            verificarOcupacion={verificarOcupacion(indiceFila, indiceColumna)}
                            key={`celda_${indiceFila}_${indiceColumna}`}
                        />
                    )
                })
            })}
        </div>
    )
}

export default Tablero;
