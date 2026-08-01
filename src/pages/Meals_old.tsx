import { useParams } from "react-router-dom";

import MealList from "../components/meals/MealList";


export default function Meals() {


    const { categoryId } = useParams();


    if (!categoryId) {

        return (

            <p>
                Category not found
            </p>

        );

    }

    return (

        <div>


            <h1
                className="
                    text-3xl
                    font-bold
                    mb-8
                "
            >

                Meals

            </h1>



            <MealList

                categoryId={categoryId}

            />


        </div>

    );

}