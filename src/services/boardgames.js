import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const boardgameIndex = async () => {
    try {
        return await axios.get(`${BASE_URL}/boardgames/`)
    } catch (error) {
        console.log(error)
        throw new error
    }
}

export const boardgameShow = async (boardgameId) => {
    try {
        return await axios.get(`${BASE_URL}/boardgames/${boardgameId}/`)
    } catch (error) {
        console.log(error)
        throw new error
    }
}