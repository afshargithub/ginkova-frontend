import type { Meal } from "../../types/Meal";


interface Props {

    meal: Meal;

}


export default function MealCard({ meal }: Props) {


    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                overflow-hidden
                hover:shadow-xl
                transition
            "
        >


            {
                meal.image && (

                    <img

                        src={meal.image}

                        alt={meal.name}

                        className="
                            w-full
                            h-48
                            object-cover
                        "

                    />

                )
            }



            <div className="p-5">


                <h2
                    className="
                        text-xl
                        font-bold
                    "
                >

                    {meal.name}

                </h2>



                <p className="text-gray-600 mt-2">

                    {meal.description}

                </p>



                {
                    meal.nutrition && (

                        <div className="mt-4 text-sm">

                            <p>
                                Calories:
                                {meal.nutrition.calories}
                            </p>


                            <p>
                                Protein:
                                {meal.nutrition.protein}
                            </p>


                        </div>

                    )
                }



                <div
                    className="
                        mt-5
                        flex
                        gap-3
                    "
                >

                    <button
                        className="
                            bg-blue-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                        "
                    >

                        View Details

                    </button>



                    <button
                        className="
                            bg-green-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                        "
                    >

                        Order

                    </button>


                </div>


            </div>


        </div>

    );

}