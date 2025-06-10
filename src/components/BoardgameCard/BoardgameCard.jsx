import './BoardgameCard.css'
import { Link } from 'react-router'

export default function BoardgameCard({ boardgame }) {
    return (
        <div className='boardgame-card'>
            <Link to={`/boardgames/${boardgame.id}`}>
                <img src={boardgame.image_url} alt={boardgame.title} className='boardgame-image'/>
            </Link>
                <div className='boardgame-content'>
                    <Link to={`/boardgames/${boardgame.id}`}>
                        <h2 className='boardgame-title'>{boardgame.title}</h2>
                    </Link>
                        <div className='boardgame-details'>
                            <p>{boardgame.description}</p>
                            <div className='type-genre'>
                                <span>Type - {boardgame.type}</span>
                                <span>Genre - {boardgame.genre}</span>
                            </div>
                            <div className='min-max-players'>
                                <span>Max Players - {boardgame.max_players}</span>
                                <span>Min Players - {boardgame.min_players}</span>
                            </div>
                            <div className='likes'>
                                <span>♥️ {boardgame.likes.length}</span>
                            </div>
                            {/* <div className='owner'>
                                <span>{boardgame.owner.username.charAt(0).toUpperCase() + boardgame.owner.username.slice(1)}</span>
                            </div> */}
                        </div>
                </div>
        </div>
    )
}