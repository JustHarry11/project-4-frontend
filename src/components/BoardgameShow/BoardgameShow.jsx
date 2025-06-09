import { boardgameShow } from "../../services/boardgames"
import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router"
import './BoardgameShow.css'

import BoardgameDelete from "../BoardgameDelete/BoardgameDelete"
import BoardgameResult from "../BoardgameResult/BoardgameResult"

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
                        <div className="single-boardgame-container">
                            <div className="single-boardgame">
                                <h1>{boardgame.title}</h1>
                                <img src={boardgame.image_url} alt={boardgame.title} className='boardgame-image' />
                                <div className="single-content">
                                    <div className='single-type-genre'>
                                        <span>Type - {boardgame.type}</span>
                                        <span>Genre - {boardgame.genre}</span>
                                    </div>
                                    <div className='single-min-max-players'>
                                        <span>Max Players - {boardgame.max_players}</span>
                                        <span>Min Players - {boardgame.min_players}</span>
                                    </div>
                                    <div className='single-likes'>
                                        <span>Likes {boardgame.likes.length}</span>
                                    </div>
                                </div>

                                <div className="single-boardgame-content">
                                    <p>{boardgame.description}</p>
                                    <p>{boardgame.instruction}</p>
                                </div>
                                <div className='owner'>
                                    <span>{boardgame.owner.username.charAt(0).toUpperCase() + boardgame.owner.username.slice(1)}</span>
                                </div>
                                {user && user.id === boardgame.owner?.id &&
                                    <div className="single-control">
                                        <Link className="single-edit-boardgame" to={`/boardgames/${boardgameId}/edit`}>Edit</Link>
                                        <BoardgameDelete />
                                    </div>}
                                {user &&
                                    <div className="results">
                                        <BoardgameResult boardgame={boardgame} />
                                    </div>
                                }
                            </div>
                        </div>

                    )}

        </>
    )
}