import { Navigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { profileData } from "../../services/profile";
import BoardgameCard from "../BoardgameCard/BoardgameCard";

import './UserProfile.css'

export default function UserProfile() {

    const { data: profile, isLoading, error } = useFetch(profileData, {
        username: '',
        boardgames: [],
        results: [],
    })

    return (
        <div className="profile-page">
            <h1 className="profile-title">{profile.username}'s Profile</h1>

            <div className="profile-games">
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
            </div>

            <div className="profile-results">
                <h2>Your Results</h2>
                {profile.results.length === 0 ? (
                    <p>No results added.</p>
                ) : (
                    profile.results.map((result) => (
                        <p key={result.id}>
                            <strong>{result.boardgame_title}</strong> — {result.result}
                        </p>
                    ))

                )}
            </div>
        </div>
    )
}