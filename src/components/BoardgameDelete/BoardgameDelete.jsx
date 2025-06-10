import { useState } from "react";
import { boardgameDelete } from "../../services/boardgames";
import { useParams, useNavigate } from "react-router";

export default function BoardgameDelete(){
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const { boardgameId } = useParams()
    const navigate = useNavigate()

    async function handleDelete(){
        setIsLoading(true)
        try {
            await boardgameDelete(boardgameId)
            navigate('/boardgames')
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {error && <p className="error-message">{error}</p>}
            <button className="button" onClick={handleDelete}>
                {isLoading ? `Loading ... ` : 'Delete'}
            </button>
        </>
    )
}