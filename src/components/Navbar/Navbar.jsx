import { NavLink } from "react-router"
import './Navbar.css'

import { UserContext } from "../../contexts/UserContext"
import { removeToken } from "../../utils/auth"
import { useContext } from "react"

export default function Navbar() {

    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        removeToken()
        setUser(null)
    }


    return (
        <header>
            <div className="app-logo">
            </div>
            <nav>
                <NavLink to="/">♟️</NavLink>
                <NavLink to="/boardgames">Boardgames</NavLink>
                { user
                    ? (
                        <>
                            {/* Signed in routes */}
                            <NavLink to="/boardgames/new">Add a game</NavLink>
                            <NavLink onClick={() => { handleSignOut() }} to="/signin">Sign Out</NavLink>
                        </>
                    )
                    : (
                        <>
                            {/* Signed out routes*/}
                            <NavLink to="/signup">Sign Up</NavLink>
                            <NavLink to="/signin">Sign In</NavLink>
                        </>
                    )
                }
            </nav>
        </header>
    )
}