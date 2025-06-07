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
            <nav className="navbar">
                <div className="navbar-left">
                    <NavLink to="/">♟️</NavLink>
                    <NavLink to="/boardgames">Boardgames</NavLink>
                </div>

                <div className="navbar-right">
                    {user
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
                </div>

            </nav>
        </header>
    )
}