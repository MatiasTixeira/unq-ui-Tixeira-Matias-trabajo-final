import { NavLink } from 'react-router-dom'
import reglas from  '../assets/reglas.png'
import './PaginaPrincipal.css'
import MenuSuperior from './MenuSuperior'

const PaginaPrincipal = () => {
  return (
    <div className='html-body-container'>
        <div className='container'>
            <MenuSuperior/>
            <div className='container-juego'>
                <div className='container-Jugar'>
                <NavLink to="/game"><button className='btn-Jugar'><span>JUGAR</span></button></NavLink>
                </div>
                <img src={reglas} alt="Reglas"/>
            </div>
        </div>
    </div>
  )
}

export default PaginaPrincipal