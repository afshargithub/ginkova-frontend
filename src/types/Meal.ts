//fields are according to meads Serializer file in Django back-end
export interface Meal {

    id: number;

    name: string;

    description: string;

    meal_type: string;

    price: number;

    image: string | null;

    is_featured: boolean;

    is_active: boolean;

    nutrition?: {

        calories?: number;

        protein?: number;

        fat?: number;

        carbohydrates?: number;

    };

}