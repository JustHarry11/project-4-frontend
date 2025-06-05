import { NavLink } from "react-router"
import './Navbar.css'

export default function Navbar(){
    return (
        <header>
            <div className="app-logo">
            </div>
            <nav>
                <NavLink to="/">♟️</NavLink>
                <NavLink to="/boardgames">Boardgames</NavLink>
                <NavLink to="/">Add a game</NavLink>
            </nav>
        </header>
    )
}