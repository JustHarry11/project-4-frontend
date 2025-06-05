import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const signupUser = async (userData) => {
    try {
        return axios.post(`${BASE_URL}/auth/sign-up/`, userData)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const signinUser = async (userData) => {
    try {
        return axios.post(`${BASE_URL}/auth/sign-in/`, userData)
    } catch (error) {
        console.log(error)
        throw error
    }
}