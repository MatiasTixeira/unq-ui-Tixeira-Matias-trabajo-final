import CuadradoDelTablero from "./CuadradoDelTablero";


const Tablero = ({ direction = "row" }) => {
  const getAxisLabels = (direction) => {
    switch (direction) {
      case "row":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      case "column":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      default:
    }
  };

  return (
    <div className={`battleship__axis ${direction}`}>
      {getAxisLabels(direction).map((label, index) => {
        return <CuadradoDelTablero key={`axis_label_${label}`} label={label} />;
      })}
    </div>
  );
};

export default Tablero;