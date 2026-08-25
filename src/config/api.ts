import axios from "axios";

import type {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";

import {
    clearTokens,
    getAccessToken,
    getRefreshToken,
    saveTokens,
} from "../services/tokenService";

import {
    getStoredLanguage,
} from "../i18n/language";


// --------------------------------------------------
// API Base URL
// --------------------------------------------------

const rawBaseURL =
    import.meta.env.VITE_API_BASE_URL;

if (!rawBaseURL) {
    throw new Error(
        "VITE_API_BASE_URL is not defined. Check the environment variables."
    );
}

// Remove trailing "/" if one exists.
// Example:
// http://127.0.0.1:8000/api/
// becomes:
// http://127.0.0.1:8000/api
const baseURL = rawBaseURL.replace(
    /\/+$/,
    ""
);


// --------------------------------------------------
// Axios Instance
// --------------------------------------------------

const api = axios.create({
    baseURL,
    timeout: 15_000,
});


// --------------------------------------------------
// Request Interceptor
//
// Adds:
// 1. Accept-Language
// 2. JWT Access Token
// --------------------------------------------------

api.interceptors.request.use(
    (config) => {
        const language =
            getStoredLanguage();

        config.headers.set(
            "Accept-Language",
            language
        );

        const accessToken =
            getAccessToken();

        if (accessToken) {
            config.headers.set(
                "Authorization",
                `Bearer ${accessToken}`
            );
        }

        return config;
    }
);


// --------------------------------------------------
// Types used by token refresh logic
// --------------------------------------------------

interface RetryableRequestConfig
    extends InternalAxiosRequestConfig {
    _retry?: boolean;
}


interface RefreshTokenResponse {
    access: string;
    refresh: string;
}


// --------------------------------------------------
// Refresh Promise
//
// Prevents several simultaneous 401 responses
// from making several refresh requests.
// --------------------------------------------------

let refreshPromise:
    Promise<string> | null = null;


// --------------------------------------------------
// Obtain New Access Token
// --------------------------------------------------

async function obtainFreshAccessToken():
    Promise<string> {

    const refresh =
        getRefreshToken();

    if (!refresh) {
        throw new Error(
            "Refresh token is missing."
        );
    }

    /*
     * Use the original Axios library here,
     * NOT our configured "api" instance.
     *
     * This prevents the refresh request itself
     * from entering the response interceptor.
     */
    const response =
        await axios.post<RefreshTokenResponse>(
            `${baseURL}/auth/refresh/`,
            {
                refresh,
            },
            {
                timeout: 15_000,
            }
        );

    saveTokens(
        response.data.access,
        response.data.refresh
    );

    return response.data.access;
}


// --------------------------------------------------
// Share One Refresh Operation
// --------------------------------------------------

function getFreshAccessToken():
    Promise<string> {

    if (!refreshPromise) {
        refreshPromise =
            obtainFreshAccessToken()
                .finally(() => {
                    refreshPromise = null;
                });
    }

    return refreshPromise;
}


// --------------------------------------------------
// Response Interceptor
//
// If:
// Access Token expires
//      ↓
// API returns 401
//      ↓
// Refresh Access Token
//      ↓
// Save new Access + Refresh tokens
//      ↓
// Retry original request
// --------------------------------------------------

api.interceptors.response.use(
    (response) => response,

    async (
        error: AxiosError
    ) => {

        const originalRequest =
            error.config as
                | RetryableRequestConfig
                | undefined;

        // Only handle 401 responses.
        if (
            error.response?.status !== 401
            || !originalRequest
            || originalRequest._retry
        ) {
            return Promise.reject(
                error
            );
        }

        const requestUrl =
            originalRequest.url ?? "";

        /*
         * Never try automatic refresh for
         * authentication endpoints themselves.
         *
         * Otherwise we could create an
         * infinite refresh loop.
         */
        if (
            requestUrl.includes(
                "/auth/login/"
            )
            || requestUrl.includes(
                "/auth/register/"
            )
            || requestUrl.includes(
                "/auth/refresh/"
            )
            || requestUrl.includes(
                "/auth/logout/"
            )
        ) {
            return Promise.reject(
                error
            );
        }

        const refresh =
            getRefreshToken();

        if (!refresh) {
            clearTokens();

            return Promise.reject(
                error
            );
        }

        // Prevent retrying this request repeatedly.
        originalRequest._retry = true;

        try {
            const newAccess =
                await getFreshAccessToken();

            originalRequest.headers.set(
                "Authorization",
                `Bearer ${newAccess}`
            );

            // Retry the original API request.
            return api(
                originalRequest
            );

        } catch (refreshError) {
            /*
             * Refresh token is expired,
             * invalid, or blacklisted.
             *
             * The user must log in again.
             */
            clearTokens();

            return Promise.reject(
                refreshError
            );
        }
    }
);


// --------------------------------------------------
// Export Shared Axios Instance
// --------------------------------------------------

export default api;