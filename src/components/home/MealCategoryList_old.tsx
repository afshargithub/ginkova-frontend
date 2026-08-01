import { useEffect, useState } from "react";
import type { MealCategory } from "../../types/MealCategory"
import { getMealCategories } from "../../services/mealCategoryService";
import MealCategoryCard from "./MealCategoryCard";

export default function MealCategoryList() {

    const [categories, setCategories] = useState<MealCategory[]>([]);

    useEffect(() => {

        getMealCategories()

            .then(setCategories)

            .catch(console.error);

    }, []);

    return (

        <div className="grid md:grid-cols-2 gap-6">

            {

                categories.map(category => (

                    <MealCategoryCard

                        key={category.id}

                        category={category}

                    />

                ))

            }

        </div>

    );
}