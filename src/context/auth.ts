import {
    createContext,
} from "react";

import type {
    AuthUser,
    LoginPayload,
    RegisterPayload,
} from "../types/auth";


export interface AuthContextValue {
    user: AuthUser | null;

    loading: boolean;

    isAuthenticated: boolean;

    loginUser:
        (payload: LoginPayload) =>
            Promise<void>;

    registerUser:
        (payload: RegisterPayload) =>
            Promise<void>;

    logoutUser:
        () => Promise<void>;

    refreshUser:
        () => Promise<void>;
}


export const AuthContext =
    createContext<
        AuthContextValue | undefined
    >(undefined);