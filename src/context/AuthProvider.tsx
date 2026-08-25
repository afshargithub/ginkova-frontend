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

    // --------------------------------------------------
    // Authentication State
    // --------------------------------------------------

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


    // --------------------------------------------------
    // Restore Existing Login
    //
    // When the browser is refreshed:
    //
    // Tokens
    //   ↓
    // GET /auth/me/
    //   ↓
    // Restore user
    // --------------------------------------------------

    useEffect(() => {

        let active = true;


        async function initializeAuth() {

            if (!hasTokens()) {

                if (active) {
                    setUser(null);
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

                /*
                 * Tokens are missing, invalid,
                 * expired, or cannot be refreshed.
                 */

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


    // --------------------------------------------------
    // Login
    //
    // Phone + Password
    // --------------------------------------------------

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


    // --------------------------------------------------
    // Registration Confirmation
    //
    // Important:
    //
    // Requesting the SMS code is handled separately
    // in Register.tsx using requestRegistrationCode().
    //
    // This function performs registration AFTER
    // the user enters the verification code.
    // --------------------------------------------------

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


    // --------------------------------------------------
    // Logout
    // --------------------------------------------------

    async function logoutUser():
        Promise<void> {

        try {

            await logout();

        } finally {

            /*
             * Always clear the React authentication
             * state even if server logout fails.
             */

            setUser(
                null
            );
        }
    }


    // --------------------------------------------------
    // Reload Current User
    //
    // Useful later after changing:
    // - first name
    // - last name
    // - profile information
    // --------------------------------------------------

    async function refreshUser():
        Promise<void> {

        const currentUser =
            await getCurrentUser();


        setUser(
            currentUser
        );
    }


    // --------------------------------------------------
    // Context Provider
    // --------------------------------------------------

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