import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, useNavigate } from "react-router";
import { boardgameCreate } from "../../services/boardgames";
import './BoardgameCreate.css'
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
    const { user } = useContext(UserContext)

    if(!user) {
        return <Navigate to="/signin" replace />
    }

    function handleChange({ target: { name, value, type, files } }) {
        if (type === 'file') {
            value = files[0]
        }
        setFormData({ ...formData, [name]: value })
    }
        async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setError({});

        const requiredFields = ['title', 'description', 'instruction', 'image_url', 'type', 'genre', 'min_players', 'max_players'];
        const newErrors = {}

        for (let field of requiredFields) {
            const value = formData[field]
            if(!value || (typeof value === 'string' && value.trim() === '')) {
                newErrors[field] = 'This field is required.';
            }
        }

        if(Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setIsLoading(false);
            return;
        }
        // const newFormData = {...formData}
        
        try {
            const { data } = await boardgameCreate(formData)
            navigate(`/boardgames/${data.id}`)
        } catch (error) {
            if (error.response?.data) {
                setError(error.response.data);
            }else {
                console.error('Unexpected error:', error);
                setError({ general: 'Something went wrong. Please try again.' });
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section id="form-page">
            <form className='boardgame-create-form' onSubmit={handleSubmit}>
                <h1 className="boardgame-create-form-title">Add New Game</h1>
                {/* Title */}
                <div className="input-control-create">
                    <label htmlFor="title">Title  *</label>
                    <input type='text' name="title" value={formData.title} onChange={handleChange} />
                    {error.title && <p className='error-message-create'>{error.title}</p>}
                </div>
                {/* Description */}
                <div className="input-control-create">
                    <label htmlFor="description">Description  *</label>
                    <textarea name="description" id="description" cols="30" rows="3" value={formData.description} onChange={handleChange}></textarea>
                    {error.description && <p className='error-message-create'>{error.description}</p>}
                </div>
                {/* Instruction */}
                <div className="input-control-create">
                    <label htmlFor="instruction">Instruction  *</label>
                    <textarea name="instruction" id="instruction" cols="30" rows="3" value={formData.instruction} onChange={handleChange}></textarea>
                    {error.instruction && <p className='error-message-create'>{error.instruction}</p>}
                </div>
                {/* Image */}
                <div className="input-control-create">
                    <label htmlFor="image_url">Image URL  *</label>
                    <input type="file" name="image_url" id="image_url" onChange={handleChange} />
                    {error.image_url && <p className='error-message-create'>{error.image_url}</p>}
                </div>
                {/* Type */}
                <div className="input-control-create">
                    <label htmlFor="type">Type  *</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange}>
                        <option value="" disabled>Select type</option>
                        <option value="Custom">Custom</option>
                        <option value="Original">Original</option>
                    </select>
                    {error.type && <p className='error-message-create'>{error.type}</p>}
                </div>
                {/* Genre */}
                <div className="input-control-create">
                    <label htmlFor="genre">Genre  *</label>
                    <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
                    {error.genre && <p className="error-message-create">{error.genre}</p>}
                </div>
                {/* Min Players */}
                <div className="input-control-create">
                    <label htmlFor="min_players">Min Players  *</label>
                    <input type="number" name="min_players" value={formData.min_players} onChange={handleChange} />
                    {error.min_players && <p className="error-message-create">{error.min_players}</p>}
                </div>

                {/* Max Players */}
                <div className="input-control-create">
                    <label htmlFor="max_players">Max Players  *</label>
                    <input type="number" name="max_players" value={formData.max_players} onChange={handleChange} />
                    {error.max_players && <p className="error-message-create">{error.max_players}</p>}
                </div>
                <div>
                    <h4>* Required Field</h4>
                </div>

                <button type="submit" className='button'>{ isLoading ? `Loading...` : `Submit`}</button>
            </form>
        </section>
    )
}