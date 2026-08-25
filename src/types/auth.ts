export type Language =
    | "en"
    | "fa"
    | "hy"
    | "ru";


// --------------------------------------------------
// Authenticated User
// --------------------------------------------------

export interface AuthUser {
    id: number;

    phone: string;

    email: string | null;

    first_name: string;

    last_name: string;

    language: Language;

    phone_verified: boolean;

    email_verified: boolean;

    created_at: string;
}


// --------------------------------------------------
// Login
// --------------------------------------------------

export interface LoginPayload {
    phone: string;
    password: string;
}


// --------------------------------------------------
// Registration - Step 1
// Request SMS Code
// --------------------------------------------------

export interface RegistrationCodeRequestPayload {
    phone: string;
}


// --------------------------------------------------
// Registration - Step 2
// Verify SMS Code + Create Account
// --------------------------------------------------

export interface RegisterPayload {
    phone: string;

    code: string;

    password: string;

    password_confirm: string;

    first_name?: string;

    last_name?: string;

    language?: Language;
}


// --------------------------------------------------
// Forgot Password - Step 1
// Request SMS Code
// --------------------------------------------------

export interface PasswordResetCodeRequestPayload {
    phone: string;
}


// --------------------------------------------------
// Forgot Password - Step 2
// Verify SMS + Set New Password
// --------------------------------------------------

export interface PasswordResetConfirmPayload {
    phone: string;

    code: string;

    new_password: string;

    new_password_confirm: string;
}


// --------------------------------------------------
// Authentication Response
// --------------------------------------------------

export interface AuthResponse {
    access: string;

    refresh: string;

    user: AuthUser;
}


// --------------------------------------------------
// Refresh Token Response
// --------------------------------------------------

export interface RefreshResponse {
    access: string;

    refresh: string;
}