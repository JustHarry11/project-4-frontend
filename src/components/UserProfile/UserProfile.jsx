import { Navigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { profileData } from "../../services/profile";
import BoardgameCard from "../BoardgameCard/BoardgameCard";

export default function UserProfile() {

    const { data: profile, isLoading, error } = useFetch(profileData, {
        username: '',
        boardgames: [],
        results: [],
    })

    return (
        <div className="profile-page">
            <h1>{profile.username}'s Profile</h1>

            <section>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : isLoading ? (
                    <p>Loading ...</p>
                ) : profile.boardgames.length > 0 ? (
                    profile.boardgames.map((boardgame) => (
                        <BoardgameCard key={boardgame.id} boardgame={boardgame} />
                    ))
                ) : (
                    <p>No Boardgames Found</p>
                )}
            </section>

            <section>
                <h2>Your Results</h2>
                {profile.results.length === 0 ? (
                    <p>No results added.</p>
                ) : (
                    <ul>
                        {profile.results.map((result) => (
                            <li key={result.id}>
                                <strong>{result.boardgame_title}</strong> — {result.result}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}