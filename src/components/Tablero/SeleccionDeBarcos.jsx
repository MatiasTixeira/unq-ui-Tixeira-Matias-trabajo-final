import { posiblesDisposiciones } from "../Informacion"

const SeleccionDeBarcos = ({ título, barcosDisponiblesJugador, manejarSeleccionarBarcoParaColocar, barcoSeleccionadoParaColocar, ejesSeleccionadosJugador, alSeleccionarEje }) => {
  return (
    <div className="inventario">
      <div className="inventario__título"> {título} </div>
      <div className="inventario__cuerpo">
        <div className="inventario__ejes">
          <button
            className={ ejesSeleccionadosJugador === posiblesDisposiciones.horizontal ? "seleccionado" : "" }
            onClick={() => alSeleccionarEje(posiblesDisposiciones.horizontal)}> Horizontal
          </button>
          <button
            className={ejesSeleccionadosJugador === posiblesDisposiciones.vertical ? "seleccionado" : ""}
            onClick={() => alSeleccionarEje(posiblesDisposiciones.vertical)}> Vertical
          </button>
        </div>
        {barcosDisponiblesJugador.map((barco) => {
          return (
            <div
              key={barco.nombre}
              id={barco.nombre}
              className={`inventario__elemento ${
                barcoSeleccionadoParaColocar && barcoSeleccionadoParaColocar.nombre === barco.nombre
                  ? "seleccionado"
                  : ""
              }`}
              onClick={() => manejarSeleccionarBarcoParaColocar(barco)} >
              <span className="inventario__elemento--nombre"> {barco.nombre} </span>
              <div className="inventario__elemento--contenedor--pequeñacaja">
                {Array(barco.longitud)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="inventario__elemento--pequeñacaja"></div>
                  ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeleccionDeBarcos;
