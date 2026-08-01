import { useEffect, useState } from "react";

import type { Meal } from "../../types/Meal";

import { getMealsByCategory } from "../../services/mealService";

import MealCard from "./MealCard";


interface Props {

    categoryId: string;

}


export default function MealList({ categoryId }: Props) {


    const [meals, setMeals] = useState<Meal[]>([]);


    const [loading, setLoading] = useState(true);



    useEffect(() => {


        getMealsByCategory(categoryId)

            .then((data) => {

                setMeals(data);

            })

            .catch((error) => {

                console.error(
                    "Meals error:",
                    error
                );

            })

            .finally(() => {

                setLoading(false);

            });


    }, [categoryId]);



    if (loading) {

        return (

            <p>
                Loading meals...
            </p>

        );

    }



    if (meals.length === 0) {

        return (

            <p>
                No meals found.
            </p>

        );

    }



    return (

        <div
            className="
                grid
                md:grid-cols-3
                gap-6
            "
        >

            {
                meals.map((meal) => (

                    <MealCard

                        key={meal.id}

                        meal={meal}

                    />

                ))
            }


        </div>

    );

}