import { NavLink } from 'react-router-dom'
import reglas from  '../assets/reglas.png'
import './PaginaPrincipal.css'

const PaginaPrincipal = () => {
  return (
    <div className='html-body-container'>
        <div className='container'>
            <div className='topMenu'>
                <nav>
                <ul>
                    <li><p> BATALLA NAVAL </p></li>
                    <li><NavLink to="/"><a className="Reglas" href="pagina submain2.html">REGLAS</a></NavLink></li>
                    <li><NavLink to="/game"><a className="JUGAR" href="contactos.html">JUGAR </a></NavLink></li>
                </ul>
                </nav>
            </div>
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