import './BoardgameCard.css'
import { Link } from 'react-router'

export default function BoardgameCard({ boardgame }) {
    return (
        <Link to={`/boardgames/${boardgame.id}`}>
            <div className='boardgame-card'>

                <img src={boardgame.image_url} alt={boardgame.title} className='boardgame-image' />

                <div className='boardgame-content'>

                    <h2 className='boardgame-title'>{boardgame.title}</h2>

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
                    </div>
                </div>
            </div>
        </Link>
    )
}