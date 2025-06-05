import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router"

export default function BoardgamesIndex() {

    const [boardgames, setBoardgames] = useState([])
    useEffect(() => {
        async function getBoardgames() {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/boardgames/')
                setBoardgames(data)
            } catch (error) {
                console.log(error)
            }
        }
        getBoardgames()
    }, [])
    return (
        <>
            <section className="boardgame_list">
                {boardgames.map(boardgame => (
                    <Link key={boardgame.id} to={`/boardgames/${boardgame.id}`}>
                        <article>
                            <h2>{boardgame.title}</h2>
                        </article>
                    </Link>
                ))}
            </section>
        </>
    )
}