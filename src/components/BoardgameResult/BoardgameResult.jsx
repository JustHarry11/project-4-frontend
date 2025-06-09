import { resultCreate } from "../../services/results";

export default function BoardgameResult({ boardgame }) {
    
    const handleResultClick = async (resultChoice) => {
        try {
            const response = await resultCreate(boardgame.id, resultChoice);
            console.log('Result Submitted:', response.data);
        } catch (error) {
            console.error('Failed to submit result', error)
        }
    }

    return (
        <div className="result">
            <div className="result-buttons">
                <button onClick={() => handleResultClick('Win')}>Win</button>
                <button onClick={() => handleResultClick('Draw')}>Draw</button>
                <button onClick={() => handleResultClick('Loss')}>Loss</button>
            </div>
        </div>
    )
}