import { useContext, useState } from "react";
import { signinUser } from "../../services/auth";
import { useNavigate, Navigate } from "react-router";
import { setToken, getUserFromToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import './UserSignIn.css'

export default function UserSignIn(){


    const { user, setUser } = useContext(UserContext)
    const [ userData, setUserData ] = useState({
        email: '',
        password:''
    })

    const [ error, setError ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(evt) {
        evt.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await signinUser(userData)
            setToken(data.access)
            setUser(getUserFromToken())
            navigate(`/boardgames`)
        } catch (error) {
            console.error(error.response.data)
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleChange(evt) {
        const copiedObject = { ...userData }
        copiedObject[evt.target.name] = evt.target.value
        setUserData(copiedObject)
        setError({ ...error, [evt.target.name]: ''})
    }

    if (user) {
        return <Navigate to="/boardgames" />
    }

        return (
        <section id="form-page">
            <form className="user-form" onSubmit={handleSubmit}>
                <h1 className="user-form-title">Sign In</h1>

                <div className="input-control">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" onChange={handleChange} value={userData.email} required />
                    {error.username && <p className="error-message">{error.username}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={userData.password} required />
                    {error.password && <p className="error-message">{error.password}</p>}
                </div>

                {error.detail && <p className="error-message">{error.detail}</p>}


                <button type="submit" className='button'>{isLoading ? `Loading...` : 'Log In'}</button>
            </form>
        </section>
    )
}