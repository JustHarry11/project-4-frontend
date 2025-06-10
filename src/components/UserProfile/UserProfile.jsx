import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { profileData } from "../../services/profile";
import BoardgameCard from "../BoardgameCard/BoardgameCard";
import ResultDelete from "../ResultDelete/ResultDelete";

import './UserProfile.css'

export default function UserProfile() {

    const { data: profile, isLoading, error } = useFetch(profileData, {
        username: '',
        boardgames: [],
        results: [],
    })

    const [ results, setResults ] = useState([]);

    useEffect(() => {
        if (profile.results) {
            setResults(profile.results)
        }
    }, [profile.results])

    const handleDeleteResult = (id) => {
        setResults((prevResults) => prevResults.filter((r) => r.id !== id))
    };

    return (
        <div className="profile-page">
            <h1 className="profile-title">{profile.username.charAt(0).toUpperCase() + profile.username.slice(1)}'s Profile</h1>
            <h1 className="profile-title">Your Games</h1>

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
                {results.length === 0 ? (
                    <p>No results added.</p>
                ) : (
                    results.map((result) => (
                        <p key={result.id}>
                            <strong>{result.boardgame_title}</strong> — {result.result} 
                            <ResultDelete resultId={result.id} onDelete={handleDeleteResult}/>
                        </p>
                    ))

                )}
            </div>
        </div>
    )
}