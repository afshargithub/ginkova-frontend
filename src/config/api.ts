// export const API_BASE_URL = "HTTP://127.0.0.1:8000"

import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error(
        "VITE_API_BASE_URL is not defined. Check the environment variables."
    );
}

const api = axios.create({
    baseURL,
    timeout: 15_000,
});

export default api;