import axios from "axios";

import api from "../config/api";

import {
    clearTokens,
    getRefreshToken,
    saveTokens,
} from "./tokenService";

import type {
    AuthResponse,
    AuthUser,
    LoginPayload,
    PasswordResetConfirmPayload,
    RefreshResponse,
    RegisterPayload,
} from "../types/auth";


// --------------------------------------------------
// Registration - Step 1
// Request SMS Verification Code
// --------------------------------------------------

export async function requestRegistrationCode(
    phone: string
): Promise<void> {

    await api.post(
        "/auth/register/request-code/",
        {
            phone,
        }
    );
}


// --------------------------------------------------
// Registration - Step 2
// Verify SMS Code + Create Account
// --------------------------------------------------

export async function register(
    payload: RegisterPayload
): Promise<AuthResponse> {

    const response =
        await api.post<AuthResponse>(
            "/auth/register/confirm/",
            payload
        );

    saveTokens(
        response.data.access,
        response.data.refresh
    );

    return response.data;
}


// --------------------------------------------------
// Login
// --------------------------------------------------

export async function login(
    payload: LoginPayload
): Promise<AuthResponse> {

    const response =
        await api.post<AuthResponse>(
            "/auth/login/",
            payload
        );

    saveTokens(
        response.data.access,
        response.data.refresh
    );

    return response.data;
}


// --------------------------------------------------
// Current Authenticated User
// --------------------------------------------------

export async function getCurrentUser():
    Promise<AuthUser> {

    const response =
        await api.get<AuthUser>(
            "/auth/me/"
        );

    return response.data;
}


// --------------------------------------------------
// Refresh JWT Tokens
// --------------------------------------------------

export async function refreshTokens():
    Promise<RefreshResponse> {

    const refresh =
        getRefreshToken();

    if (!refresh) {
        throw new Error(
            "No refresh token is available."
        );
    }

    const response =
        await api.post<RefreshResponse>(
            "/auth/refresh/",
            {
                refresh,
            }
        );

    saveTokens(
        response.data.access,
        response.data.refresh
    );

    return response.data;
}


// --------------------------------------------------
// Logout
// --------------------------------------------------

export async function logout():
    Promise<void> {

    const refresh =
        getRefreshToken();

    if (!refresh) {
        clearTokens();
        return;
    }

    try {
        await api.post(
            "/auth/logout/",
            {
                refresh,
            }
        );

    } catch (error) {

        /*
         * The access token may have expired
         * immediately before logout.
         *
         * Try refreshing once and then
         * blacklist the new refresh token.
         */
        if (
            axios.isAxiosError(error)
            && error.response?.status === 401
        ) {
            try {
                const tokens =
                    await refreshTokens();

                await api.post(
                    "/auth/logout/",
                    {
                        refresh:
                            tokens.refresh,
                    }
                );

            } catch {
                /*
                 * Even if server-side logout
                 * cannot be completed, remove
                 * local authentication data.
                 */
            }

        } else {
            throw error;
        }

    } finally {
        clearTokens();
    }
}


// --------------------------------------------------
// Forgot Password - Step 1
// Request SMS Verification Code
// --------------------------------------------------

export async function requestPasswordResetCode(
    phone: string
): Promise<void> {

    await api.post(
        "/auth/password-reset/request-code/",
        {
            phone,
        }
    );
}


// --------------------------------------------------
// Forgot Password - Step 2
// Verify SMS Code + Set New Password
// --------------------------------------------------

export async function confirmPasswordReset(
    payload: PasswordResetConfirmPayload
): Promise<void> {

    await api.post(
        "/auth/password-reset/confirm/",
        payload
    );
}