import { TableroDelJueguito, tiroEsquivado } from "./Informacion"

export const tieneSuficientesBloquesParaDesplegar = ( esHorizontal, longitudBarco, indiceFila, indiceColumna ) => {
  return esHorizontal
    ? longitudBarco + indiceFila > 10
        ? false
        : true
    : longitudBarco + indiceColumna > 10
        ? false
        : true
}

const obtenerDatosOcupablesSegunEje = ( esHorizontal, indiceFila, indiceColumna, indiceArr ) => {
  return esHorizontal
    ? `${indiceFila + indiceArr}${indiceColumna}`
    : `${indiceFila}${indiceColumna + indiceArr}`
}

export const obtenerBloquesOcupables = ( esHorizontal, indiceFila, indiceColumna, longitudBarco ) => {
  let bloquesOcupables = []
  Array(longitudBarco)
    .fill(0)
    .forEach((_, indiceArr) => {
      bloquesOcupables.push( obtenerDatosOcupablesSegunEje( esHorizontal, indiceFila, indiceColumna, indiceArr ) )
    })
  return bloquesOcupables
}

export const estaOcupadoPorOtroBarco = (barcosDesplegados, bloquesOcupados) => {
  let estaOcupado = false
  let nombreBarco = ""
  if (barcosDesplegados && barcosDesplegados.length > 0) {
    barcosDesplegados.forEach((barco) => {
      barco.bloquesOcupados.forEach((bloque) => {
        if (bloquesOcupados.includes(bloque)) {
          nombreBarco = barco?.nombreBarco
          estaOcupado = true
          return
        }
      })
    })
  }
  return { estaOcupado, nombreBarco }
}

export const generarIndiceFilaYColumnaAleatorio = () => {
  const indiceColumna = Math.floor(Math.random() * TableroDelJueguito.length)
  const indiceFila = Math.floor(Math.random() * TableroDelJueguito[indiceColumna].length)
  return { indiceFila, indiceColumna }
}

export const obtenerBloqueOcupableAleatorio = (barcosComputadora, esHorizontal) => {
  const { indiceFila, indiceColumna } = generarIndiceFilaYColumnaAleatorio()
  if ( tieneSuficientesBloquesParaDesplegar( esHorizontal, barcosComputadora.longitudBarco, indiceFila, indiceColumna )) {
    return obtenerBloquesOcupables( esHorizontal, indiceFila, indiceColumna, barcosComputadora.longitudBarco )
  } else {
    return obtenerBloqueOcupableAleatorio(barcosComputadora, esHorizontal)
  }
}

export const verificarSiBloqueDeAtaqueTieneMismoBarcoEIndice = ( nombreBarco, índiceSeleccionado, arrayBarcosDesplegados) => {
  let resultado = false
  if ( arrayBarcosDesplegados && arrayBarcosDesplegados.length > 0 && arrayBarcosDesplegados.bloquesOcupados && arrayBarcosDesplegados.bloquesOcupados.length > 0 ) {
    arrayBarcosDesplegados.bloquesOcupados.forEach((bloque) => {
      if ( bloque.nombreBarco === nombreBarco && bloque.índiceAtacado === índiceSeleccionado ) {
        resultado = true
      }
    })
  }
  return resultado
}

export const obtenerNombreBarcoPorCoordenadas = (barcosDesplegados, coordenadas) => {
  let nombreBarco = ""
  barcosDesplegados.forEach((barco) => {
    if (barco?.nombreBarco !== tiroEsquivado) {
      barco.bloquesOcupados.forEach((bloque) => {
        if (bloque === coordenadas) {
          nombreBarco = barco.nombreBarco
        }
      })
    }
  })
  return nombreBarco
}

export const sonArraysIguales = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.sort().toString() === arr2.sort().toString()
}
