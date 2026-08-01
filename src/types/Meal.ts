
interface MealNutrition {
    calories?: number;
    protein?: number;
    carbohydrate?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
}

export interface Meal {
    id: number;
    name: string;
    description: string;
    image: string | null;
    meal_type: string;
    is_featured: boolean;
    is_active: boolean;
    nutrition?: MealNutrition;
}