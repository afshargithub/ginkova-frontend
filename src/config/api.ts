import axios from "axios";

import {
    getStoredLanguage,
} from "../i18n/language";

const baseURL =
    import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error(
        "VITE_API_BASE_URL is not defined. Check the environment variables."
    );
}

const api = axios.create({
    baseURL,
    timeout: 15_000,
});

api.interceptors.request.use(
    (config) => {
        const language =
            getStoredLanguage();

        config.headers.set(
            "Accept-Language",
            language
        );

        return config;
    }
);

export default api;