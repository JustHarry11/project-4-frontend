import { useState } from "react";
import { resultDelete } from "../../services/results";
import { useParams, useNavigate } from "react-router";

export default function ResultDelete() {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { resultId } = useParams()
    const navigate = useNavigate()

    async function handleDelete() {
        setIsLoading(true)
        try {
            await resultDelete(resultId)
            navigate('/profile')
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            {error && <p className="error-message">{error}</p>}
            <button className="delete-result" onClick={handleDelete}>
                {isLoading ? `Loading ... ` : 'Delete'}
            </button>
        </>
    )
}