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
  RefreshResponse,
  RegisterPayload,
} from "../types/auth";


export async function register(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/register/",
    payload
  );

  saveTokens(
    response.data.access,
    response.data.refresh
  );

  return response.data;
}


export async function login(
  payload: LoginPayload
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/login/",
    payload
  );

  saveTokens(
    response.data.access,
    response.data.refresh
  );

  return response.data;
}


export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api.get<AuthUser>(
    "/auth/me/"
  );

  return response.data;
}


export async function refreshTokens(): Promise<RefreshResponse> {
  const refresh = getRefreshToken();

  if (!refresh) {
    throw new Error(
      "No refresh token is available."
    );
  }

  const response = await api.post<RefreshResponse>(
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


export async function logout(): Promise<void> {
  const refresh = getRefreshToken();

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
     * If the access token expired immediately before
     * logout, obtain a fresh token pair and retry logout
     * with the new refresh token.
     */
    if (
      axios.isAxiosError(error)
      && error.response?.status === 401
    ) {
      try {
        const tokens = await refreshTokens();

        await api.post(
          "/auth/logout/",
          {
            refresh: tokens.refresh,
          }
        );
      } catch {
        // Local logout still happens below.
      }
    } else {
      throw error;
    }
  } finally {
    clearTokens();
  }
}