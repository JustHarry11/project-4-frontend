import { Link } from "react-router"
import useFetch from "../../hooks/useFetch"
import { useState } from "react"
import BoardgameCard from "../BoardgameCard/BoardgameCard"

import { boardgameIndex } from "../../services/boardgames"
import './BoardgameIndex.css'

export default function BoardgameIndex() {

    const { data: boardgames, isLoading, error} = useFetch(boardgameIndex, [])

    const [ selctedType, setSelctedType] = useState('all')
    const handleFilterChange = (form) => {
        setSelctedType(form.target.value)
    }

    const filteredBoardgames = boardgames?.filter(boardgame => {
        if ( selctedType === 'all') return true
        return boardgame.type === selctedType
    })


    return (
        <>
            <h1 className="boardgame-index-title">Boardgames</h1>
            <div className="boardgame-filter-container">
                <label htmlFor="type-select">Filter by type: </label>
                <select id="type-select" value={selctedType} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="Original">Original</option>
                    <option value="Custom">Custom</option>
                </select>
            </div>
            <section className="boardgame_list">
                {error
                    ? <p className="error-message">{error}</p>
                    : isLoading
                        ? <p>Loading ...</p>
                        : filteredBoardgames.length > 0
                            ? filteredBoardgames.map(boardgame => ( <BoardgameCard key={boardgame.id} boardgame={boardgame}/>

                            ))
                            : <p> No Boardgames Found</p>
                }
            </section>
        </>
    )
}