import { useEffect, useState } from "react"
import { boardgameShow } from "../../services/boardgames"
import { useParams } from "react-router"



export default function BoardgameShow() {

    const [boardgame, setBoardgame] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const { boardgameId } = useParams()

    useEffect(() => {
        async function getBoardgame() {
            try {
                const { data } = await boardgameShow(boardgameId)
                setBoardgame(data)
            } catch {
                setError('Failed to fetch boardgame data. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        getBoardgame()
    }, [boardgameId])


    return (
        <>
            {error
                ? <p className="error-message">{error}</p>
                : loading
                    ? <p>Loading...</p>
                    : (
                       <section>
                            <h1>{boardgame.title}</h1>
                            <h2>{boardgame.description}</h2>
                       </section> 
                    )}
        
        </>
    )
}