import { Link } from "react-router"
import useFetch from "../../hooks/useFetch"

import { boardgameIndex } from "../../services/boardgames"

export default function BoardgameIndex() {

    const { data: boardgames, isLoading, error} = useFetch(boardgameIndex, [])


    return (
        <>
            <section className="boardgame_list">
                {error
                    ? <p className="error-message">{error}</p>
                    : isLoading
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