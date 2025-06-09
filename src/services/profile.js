import axios from "axios";
import { getToken } from "../utils/auth";
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const profileData = async () => {
    try {
        return await axios.get(`${BASE_URL}/auth/profile/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log(error)
        throw new error
    }
}