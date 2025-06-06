import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { boardgameCreate } from "../../services/boardgames";

export default function BoardgameCreate() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instruction: '',
        image_url: null,
        type: '',
        genre: '',
        max_players: '',
        min_players: '',
    });

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    function handleChange({ target: { name, value, type, files } }) {
        if (type === 'file') {
            value = files[0]
        }
        setFormData({ ...formData, [name]: value })
    }
        async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)

        const newFormData = {...formData}
        
        try {
            const { data } = await boardgameCreate(newFormData)
            navigate(`/boardgames/${data.id}`)
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section id="form-page">
            <form className='boardgame-create-form' onSubmit={handleSubmit}>
                <h1>Add New Game</h1>
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
                    {error.description && <p className='error-message-create'>{error.description}</p>}
                </div>
                {/* Image */}
                <div className="input-control-create">
                    <label htmlFor="image_url">Image URL</label>
                    <input type="file" name="image_url" id="image_url" onChange={handleChange} />
                    {error.imageUrl && <p className='error-message-create'>{error.imageUrl}</p>}
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

                <button type="submit" className='button'>{ isLoading ? `Loading...` : `Submit`}</button>
            </form>
        </section>
    )
}