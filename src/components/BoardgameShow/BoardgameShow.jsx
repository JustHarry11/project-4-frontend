import { boardgameShow } from "../../services/boardgames"
import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

import BoardgameDelete from "../BoardgameDelete/BoardgameDelete"

export default function BoardgameShow() {

    const { boardgameId } = useParams()
    const { user } = useContext(UserContext)

    const { data: boardgame, isLoading, error } = useFetch(
        boardgameShow,
        {},
        boardgameId
    )



    return (
        <>
            {error
                ? <p className="error-message">{error}</p>
                : isLoading
                    ? <p>Loading...</p>
                    : (
                        <section>
                            <h1>{boardgame.title}</h1>
                            <h2>{boardgame.description}</h2>
                            {user && user.id === boardgame.owner?.id &&
                                <div className="controls">
                                    <BoardgameDelete />
                                </div>}
                        </section>
                    )}

        </>
    )
}