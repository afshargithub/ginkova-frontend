import type { HealthGoal } from "../types/HealthGoal";
import { API_BASE_URL } from "../config/api";


export async function getHealthGoals(): Promise<HealthGoal[]> {

    const response = await fetch(
        `${API_BASE_URL}/api/health/health-goals/`
    );

    console.log("Status:", response.status);
    console.log("URL:", response.url);

    const text = await response.text();

    console.log("Server Response:", text);

    return JSON.parse(text);
}