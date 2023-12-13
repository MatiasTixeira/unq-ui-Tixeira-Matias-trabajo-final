import CuadradoDelEje from "./CuadradoDelEje"
import './EjesDelTablero.css'

const EjesDelTablero = ({ direccion = "row" }) => {

  const etiquetas = (direccion) => {
    switch (direccion) {
      case "row":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      case "column":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      default:
    }
  }

  return (
    <div className={`tablero ${direccion}`}>
      {etiquetas(direccion).map((value, index) => {
        return <CuadradoDelEje key={`cuadrado${value}`} value={value} />
      })}
    </div>
  )

}

export default EjesDelTablero;