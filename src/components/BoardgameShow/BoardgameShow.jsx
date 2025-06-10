import { boardgameShow } from "../../services/boardgames"
import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router"
import './BoardgameShow.css'

import BoardgameDelete from "../BoardgameDelete/BoardgameDelete"
import BoardgameResult from "../BoardgameResult/BoardgameResult"
import BoardgameLike from "../BoardgameLike/BoardgameLike"

export default function BoardgameShow() {

    const { boardgameId } = useParams()
    const { user } = useContext(UserContext)

    const { data: fetchedBoardgame, isLoading, error } = useFetch(
        boardgameShow,
        {},
        boardgameId
    )

    const [boardgame, setBoardgame] = useState(null)

    useEffect(() => {
        if (fetchedBoardgame) {
            setBoardgame(fetchedBoardgame)
        }
    }, [fetchedBoardgame])

    function handleLikeUpdate(newLiked) {
        if (!boardgame) return
        let updatedLikes;

        if (newLiked) {
            if (!boardgame.likes.includes(user.id)) {
                updatedLikes = [...boardgame.likes, user.id]
            } else {
                updatedLikes = boardgame.likes
            }
        } else {
            updatedLikes = boardgame.likes.filter(id => id !== user.id);
        }
        setBoardgame(prev => ({
            ...prev,
            likes: updatedLikes
        }));
    }





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
                                        <span>Likes {boardgame.likes ? boardgame.likes.length : 0}</span>
                                    </div>
                                </div>

                                <div className="single-boardgame-content">
                                    <h2>Description : </h2>
                                    <p>{boardgame.description}</p>
                                    <h2>Instruction : </h2>
                                    <p>{boardgame.instruction}</p>
                                </div>
                                <div className='owner'>
                                    <span>{boardgame.owner?.username
                                        ? boardgame.owner.username.charAt(0).toUpperCase() + boardgame.owner.username.slice(1)
                                        : "Unknow Owner"}
                                    </span>
                                </div>


                                {user && user.id === boardgame.owner?.id &&
                                    <div className="single-control">
                                        <Link className="button" to={`/boardgames/${boardgameId}/edit`}>Edit</Link>
                                        <BoardgameDelete />
                                    </div>}
                                {user &&
                                    <div className="single-like">
                                        <BoardgameLike boardgameId={boardgameId} initialLiked={boardgame.likes?.includes(user.id)} onLikeUpdate={handleLikeUpdate} />
                                    </div>
                                }
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