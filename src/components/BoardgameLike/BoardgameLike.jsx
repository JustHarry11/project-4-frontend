import { useState } from "react";
import { boardgameLike } from "../../services/boardgames";
import './BoardgameLike.css'

export default function BoardgameLike({ boardgameId, initialLiked, onLikeUpdate }) {
    const [ liked, setLiked ] = useState(initialLiked)
    const [ loading, setLoading ] = useState(false)

    const toggleLike = async () => {
        if ( loading ) return

        setLoading(true)
        try {
            const response = await boardgameLike(boardgameId)
            setLiked(response.data.liked)

            if (onLikeUpdate) {
                onLikeUpdate(response.data.liked)
            }
        } catch (error) {
            console.error('Error toggling like:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={toggleLike} disabled={loading} className="like-button">
            {liked ? '♥️ Liked' : '🤍 Like'}
        </button>
    )
    
}