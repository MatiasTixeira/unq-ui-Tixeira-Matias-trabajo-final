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
