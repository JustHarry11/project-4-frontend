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
                                        <div>
                                            <p className="content-type">Type</p>
                                            <p>{boardgame.type}</p>
                                        </div>
                                        <div>
                                            <p className="content-type">Genre</p>
                                            <p>{boardgame.genre}</p>
                                        </div>
                                    </div>
                                    <div className='single-min-max-players'>
                                        <div>
                                            <p className="content-type">Max Players</p>
                                            <p>{boardgame.max_players}</p>
                                        </div>
                                        <div>
                                            <p className="content-type">Min Players</p>
                                            <p>{boardgame.min_players}</p>
                                        </div>
                                    </div>
                                    <div className='single-likes'>
                                        <p>♥️ {boardgame.likes ? boardgame.likes.length : 0}</p>
                                    </div>
                                </div>

                                <div className="description-content">
                                    <h3>Description : </h3>
                                    <p>{boardgame.description}</p>
                                </div>

                                <div className="instruction-content">
                                    <h3>Instruction : </h3>
                                    <p>{boardgame.instruction}</p>
                                </div>
                                <div className='owner'>
                                    <h4>Created By - {boardgame.owner?.username
                                        ? boardgame.owner.username.charAt(0).toUpperCase() + boardgame.owner.username.slice(1)
                                        : "Unknow Owner"}
                                    </h4>
                                </div>


                                {user && user.id === boardgame.owner?.id &&
                                    <div className="single-control">
                                        <Link className="edit-button" to={`/boardgames/${boardgameId}/edit`}>Edit</Link>
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