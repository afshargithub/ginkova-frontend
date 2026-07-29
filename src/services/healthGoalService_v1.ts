import type { HealthGoal } from "../types/HealthGoal";

export async function getHealthGoals(): Promise<HealthGoal[]> {

    const response = await fetch(
        '${API_BASE_URL}/api/health/health-goals/'
    );

    return response.json();

}