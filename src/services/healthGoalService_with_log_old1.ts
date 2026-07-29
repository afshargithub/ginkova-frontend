// import type { HealthGoal } from "../types/HealthGoal";
// import { API_BASE_URL } from "../config/api";
// export async function getHealthGoals(): Promise<HealthGoal[]> {
//     const response = await fetch(
//         `${API_BASE_URL}/api/health/health-goals/`
//     );
//     const text = await response.text();
//     return JSON.parse(text);
// }
// .........................
import type { HealthGoal } from "../types/HealthGoal";
import api from "../config/api";
export async function getHealthGoals(): Promise<HealthGoal[]> {
    const response = await api.get("/api/health/health-goals/");
    return response.data;
}