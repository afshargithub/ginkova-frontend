import type { HealthGoal } from "../types/HealthGoal";
import api from "../config/api";
export async function getHealthGoals(): Promise<HealthGoal[]> {
    const response = await api.get("/api/health/health-goals/");
    return response.data;
}