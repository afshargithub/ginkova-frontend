import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getCurrentUser,
    login,
    logout,
    register,
} from "../services/authService";

import {
    clearTokens,
    hasTokens,
} from "../services/tokenService";

import type {
    AuthUser,
    LoginPayload,
    RegisterPayload,
} from "../types/auth";

import {
    AuthContext,
} from "./auth";


interface AuthProviderProps {
    children: ReactNode;
}


export default function AuthProvider({
    children,
}: AuthProviderProps) {

    const [
        user,
        setUser,
    ] = useState<AuthUser | null>(
        null
    );

    const [
        loading,
        setLoading,
    ] = useState(true);


    useEffect(() => {
        let active = true;

        async function initializeAuth() {

            if (!hasTokens()) {
                if (active) {
                    setLoading(false);
                }

                return;
            }

            try {
                const currentUser =
                    await getCurrentUser();

                if (active) {
                    setUser(
                        currentUser
                    );
                }

            } catch {
                clearTokens();

                if (active) {
                    setUser(null);
                }

            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void initializeAuth();

        return () => {
            active = false;
        };
    }, []);


    async function loginUser(
        payload: LoginPayload
    ): Promise<void> {

        const response =
            await login(
                payload
            );

        setUser(
            response.user
        );
    }


    async function registerUser(
        payload: RegisterPayload
    ): Promise<void> {

        const response =
            await register(
                payload
            );

        setUser(
            response.user
        );
    }


    async function logoutUser():
        Promise<void> {

        try {
            await logout();

        } finally {
            setUser(null);
        }
    }


    async function refreshUser():
        Promise<void> {

        const currentUser =
            await getCurrentUser();

        setUser(
            currentUser
        );
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,

                isAuthenticated:
                    user !== null,

                loginUser,
                registerUser,
                logoutUser,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}