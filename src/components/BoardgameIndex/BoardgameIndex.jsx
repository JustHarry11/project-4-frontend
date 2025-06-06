import { useEffect, useState } from "react"
import { Link } from "react-router"
import { boardgameIndex } from "../../services/boardgames"

export default function BoardgameIndex() {

    const [boardgames, setBoardgames] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function getBoardgames() {
            try {
                const { data } = await boardgameIndex()
                setBoardgames(data)
            } catch {
                setError('Failed to fetch boardgame data. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        getBoardgames()
    }, [])
    return (
        <>
            <section className="boardgame_list">
                {error
                    ? <p className="error-message">{error}</p>
                    : loading
                        ? <p>Loading ...</p>
                        : boardgames.length > 0
                            ? boardgames.map(boardgame => (
                                <Link key={boardgame.id} to={`/boardgames/${boardgame.id}`}>
                                    <article>
                                        <h2>{boardgame.title}</h2>
                                    </article>
                                </Link>
                            ))
                            : <p> No Boardgames Found</p>
                }
            </section>
        </>
    )
}