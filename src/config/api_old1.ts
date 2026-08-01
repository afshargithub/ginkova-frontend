// export const API_BASE_URL = "HTTP://127.0.0.1:8000"
import axios from "axios";

const api = axios.create({

    baseURL:
        import.meta.env.VITE_API_BASE_URL,
    headers: {

        "Content-Type": "application/json",

    },

});

export default api;
