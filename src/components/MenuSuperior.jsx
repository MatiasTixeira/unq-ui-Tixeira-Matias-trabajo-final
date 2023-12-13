import './PaginaPrincipal.css'
import { NavLink } from 'react-router-dom'

const MenuSuperior = () => {
    return(
        <div className='topMenu'>
            <nav>
            <ul>
                <li><p> BATALLA NAVAL </p></li>
                <li><NavLink to="/"><a className="Reglas">REGLAS</a></NavLink></li>
                <li><NavLink to="/game"><a className="JUGAR">JUGAR </a></NavLink></li>
            </ul>
            </nav>
        </div>
    )
}

export default MenuSuperior