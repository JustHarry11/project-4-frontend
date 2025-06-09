import axios from "axios";
import { getToken } from "../utils/auth";
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


export const boardgameCreate = async (formData) => {
    try {
        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        }
        return await axios.post(`${BASE_URL}/boardgames/`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const boardgameUpdate = async (boardgameId, formData) => {
    try {
        const data = new FormData();
        const skipFields = ['id', 'created_at', 'updated_at', 'owner', 'likes'];

        for (const key in formData) {
            if (skipFields.includes(key)) continue;

            const value = formData[key]
            if (value === null || value === '') continue;

            if (key === 'image_url' && typeof value === 'string') continue;

            data.append(key, value)
        }
        for (const pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }
        return await axios.put(`${BASE_URL}/boardgames/${boardgameId}/`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const boardgameDelete = async (boardgameId) => {
    try {
        return axios.delete(`${BASE_URL}/boardgames/${boardgameId}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw new error
    }
}

export const boardgameLike = async (boardgameId) => {
    try {
        return axios.post(`${BASE_URL}/boardgames/${boardgameId}/like/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }

        )
    } catch (error) {
        console.log(error)
        throw error
    }
}