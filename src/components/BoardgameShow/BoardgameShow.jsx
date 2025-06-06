import { boardgameShow } from "../../services/boardgames"
import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch"



export default function BoardgameShow() {

    const { boardgameId } = useParams()

    const { data: boardgame, isLoading, error} = useFetch(
        boardgameShow, 
        {},
        boardgameId
    )



    return (
        <>
            {error
                ? <p className="error-message">{error}</p>
                : isLoading
                    ? <p>Loading...</p>
                    : (
                       <section>
                            <h1>{boardgame.title}</h1>
                            <h2>{boardgame.description}</h2>
                       </section> 
                    )}
        
        </>
    )
}