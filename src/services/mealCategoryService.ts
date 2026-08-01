// import api from "../config/api";
// import type { MealCategory } from "../types/MealCategory";

// export async function getMealCategories(): Promise<MealCategory[]> {

//     const response = await api.get(
//         "/meals/categories/"
//     );

//     console.log(response.data)
    
//     return response.data;
// }

import api from "../config/api";
import type { MealCategory } from "../types/MealCategory";

export async function getMealCategories(): Promise<MealCategory[]> {
    const response = await api.get<MealCategory[]>(
        "/meals/categories/"
    );

    return response.data;
}