import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Navigate } from "react-router";
import { boardgameShow, boardgameUpdate } from "../../services/boardgames";
import { UserContext } from "../../contexts/UserContext";

export default function BoardgameUpdate() {
    const { user } = useContext(UserContext)

    const [originalImageUrl, setOriginalImageUrl] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instruction: '',
        image_url: null,
        type: '',
        genre: '',
        max_players: '',
        min_players: '',
    })

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { boardgameId } = useParams()
    const navigate = useNavigate()

    function handleChange({ target: { name, value, type, files } }) {
        if (type === 'file') {
            value = files[0]
        }
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        setIsLoading(true)
        try {
            const dataToSend = { ...formData };
            if (!(formData.image_url instanceof File)) {
                if (originalImageUrl) {
                    dataToSend.image_url = originalImageUrl;
                } else {
                    delete dataToSend.image_url;
                }
            }
            await boardgameUpdate(boardgameId, dataToSend)
            navigate(`/boardgames/${boardgameId}/`)
        } catch (error) {
            console.error("Update error:", error)
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError({ general: 'Something went wrong while updating.' })
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function getBoardgameData() {
            try {
                const { data } = await boardgameShow(boardgameId)
                setFormData(data);
                setOriginalImageUrl(data.image_url);
            } catch (error) {
                console.log(error)
                setError({ ...error, preload: 'Failed to preload field values' })
            }
        }
        getBoardgameData()
    }, [boardgameId])

    if (!user) return <Navigate to='/signin' />
    // if (formData.owner && formData.owner !== user.id) return <Navigate to='/signin' />

    return (
        <section id="form-page">
            <form className='boardgame-create-form' onSubmit={handleSubmit}>
                <h1>Editing {formData.title}</h1>
                {/* Title */}
                <div className="input-control-create">
                    <label htmlFor="title">Title</label>
                    <input type='text' name="title" value={formData.title} onChange={handleChange} />
                    {error.title && <p className='error-message-create'>{error.title}</p>}
                </div>
                {/* Description */}
                <div className="input-control-create">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="3" value={formData.description} onChange={handleChange}></textarea>
                    {error.description && <p className='error-message-create'>{error.description}</p>}
                </div>
                {/* Instruction */}
                <div className="input-control-create">
                    <label htmlFor="instruction">Instruction</label>
                    <textarea name="instruction" id="instruction" cols="30" rows="3" value={formData.instruction} onChange={handleChange}></textarea>
                    {error.instruction && <p className='error-message-create'>{error.instruction}</p>}
                </div>
                {/* Image */}
                <div className="input-control-create">
                    <label htmlFor="image_url">Image URL</label>
                    <input type="file" name="image_url" id="image_url" onChange={handleChange} />
                    {error.image_url && <p className='error-message-create'>{error.image_url}</p>}
                </div>
                {/* Type */}
                <div className="input-control-create">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange}>
                        <option value="" disabled>Select type</option>
                        <option value="Custom">Custom</option>
                        <option value="Original">Original</option>
                    </select>
                    {error.type && <p className='error-message-create'>{error.type}</p>}
                </div>
                {/* Genre */}
                <div className="input-control-create">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
                    {error.genre && <p className="error-message-create">{error.genre}</p>}
                </div>
                {/* Min Players */}
                <div className="input-control-create">
                    <label htmlFor="min_players">Min Players</label>
                    <input type="number" name="min_players" value={formData.min_players} onChange={handleChange} />
                    {error.min_players && <p className="error-message-create">{error.min_players}</p>}
                </div>

                {/* Max Players */}
                <div className="input-control-create">
                    <label htmlFor="max_players">Max Players</label>
                    <input type="number" name="max_players" value={formData.max_players} onChange={handleChange} />
                    {error.max_players && <p className="error-message-create">{error.max_players}</p>}
                </div>

                <button type="submit" className='button'>{isLoading ? `Loading...` : `Update`}</button>
            </form>
        </section>
    )
}