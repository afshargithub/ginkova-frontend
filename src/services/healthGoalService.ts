// import api from "../config/api";
// import type { HealthGoal } from "../types/HealthGoal";

// export async function getHealthGoals(): Promise<HealthGoal[]> {
//     const response = await api.get("/health/health-goals/");
//     return response.data;
// }

import api from "../config/api";
import type { HealthGoal } from "../types/HealthGoal";

export async function getHealthGoals(): Promise<HealthGoal[]> {
    const response = await api.get<HealthGoal[]>(
        "/health/health-goals/"
    );

    return response.data;
}