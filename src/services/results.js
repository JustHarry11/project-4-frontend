import axios from "axios";
import { getToken } from "../utils/auth";
const BASE_URL = import.meta.env.VITE_API_BASE_URL

// export const resultIndex = async () => {
//     try {
//         return await axios.get(`${BASE_URL}/results/`, {
//             headers: {
//                 Authorization: `Bearer ${getToken()}`
//             }
//         })
//     } catch (error) {
//         console.log(error)
//         throw new error
//     }
// }

export const resultCreate = async (boardgameId, resultChoice) => {
    try {
        return await axios.post(`${BASE_URL}/results/`, { boardgame: boardgameId, result: resultChoice, },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
    } catch (error) {
        console.log(error)
        throw new error
    }
}

// export const resultShow = async (boardgameId) => {
//     try {
//         return await axios.get(`${BASE_URL}/results/${boardgameId}`, {
//             headers: {
//                 Authorization: `Bearer ${getToken()}`
//             }
//         })
//     } catch (error) {
//         console.log(error)
//         throw new error
//     }
// }

export const resultDelete = async (resultId) => {
    try {
        return await axios.delete(`${BASE_URL}/results/${resultId}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}