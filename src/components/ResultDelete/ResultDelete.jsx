import { useState } from "react";
import { resultDelete } from "../../services/results";

export default function ResultDelete({ resultId, onDelete}) {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleDelete() {
        setIsLoading(true)
        try {
            await resultDelete(resultId)
            onDelete(resultId)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            {error && <p className="error-message">{error}</p>}
            <button className="x-button" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? `Loading ... ` : 'Delete'}
            </button>
        </>
    )
}