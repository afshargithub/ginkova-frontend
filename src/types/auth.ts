export interface AuthUser {
  id: number;
  username: string;
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  language: "en" | "fa" | "hy" | "ru";
  phone_verified: boolean;
  email_verified: boolean;
  created_at: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  password_confirm: string;

  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;

  language?: "en" | "fa" | "hy" | "ru";
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

export interface RefreshResponse {
  access: string;
  refresh: string;
}