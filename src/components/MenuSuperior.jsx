import './PaginaPrincipal.css'

const MenuSuperior = () => {
    return(
        <div className='topMenu'>
            <nav>
            <ul>
                <li><p> BATALLA NAVAL </p></li>
                <li><NavLink to="/"><a className="Reglas" href="pagina submain2.html">REGLAS</a></NavLink></li>
                <li><NavLink to="/game"><a className="JUGAR" href="contactos.html">JUGAR </a></NavLink></li>
            </ul>
            </nav>
        </div>
    )
}

export default MenuSuperior