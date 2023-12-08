import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      PANTALLA DE INICIO

      REGLAS DEL JUEGO

      <NavLink to="/game">
        <span>JUGAR</span>
      </NavLink>

    </div>
  )
}

export default Home
