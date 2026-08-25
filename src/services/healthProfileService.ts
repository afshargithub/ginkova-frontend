import api from "../config/api";


// --------------------------------------------------
// Types
// --------------------------------------------------

export interface Disease {
    id: number;
    name: string;
    description?: string;
}


export interface HealthGoal {
    id: number;
    name: string;
    description?: string;
}


export interface HealthProfile {
    id: number;
    height: string | null;
    weight: string | null;
    birth_date: string | null;
    diseases: Disease[];
    goals: HealthGoal[];
    notes: string;
}


export interface HealthProfilePayload {
    height?: string | number | null;
    weight?: string | number | null;
    birth_date?: string | null;
    diseases?: number[];
    goals?: number[];
    notes?: string;
}


// --------------------------------------------------
// Get Current User Health Profile
// --------------------------------------------------

export async function getHealthProfile():
    Promise<HealthProfile> {

    const response =
        await api.get<HealthProfile>(
            "/health/profile/"
        );

    return response.data;
}


// --------------------------------------------------
// Create Health Profile
// --------------------------------------------------

export async function createHealthProfile(
    payload: HealthProfilePayload
): Promise<HealthProfile> {

    const response =
        await api.post<HealthProfile>(
            "/health/profile/",
            payload
        );

    return response.data;
}


// --------------------------------------------------
// Update Health Profile
// --------------------------------------------------

export async function updateHealthProfile(
    payload: HealthProfilePayload
): Promise<HealthProfile> {

    const response =
        await api.patch<HealthProfile>(
            "/health/profile/",
            payload
        );

    return response.data;
}