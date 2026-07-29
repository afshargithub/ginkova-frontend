import api from "../config/api";

import type { Meal } from "../types/Meal";


export async function getMealsByCategory(

    categoryId: string

): Promise<Meal[]> {


    const response = await api.get(

        `/meals/?category=${categoryId}`

    );


    return response.data;

}