import { useNavigate } from "react-router-dom";
import type { MealCategory } from "../../types/MealCategory";


interface Props {

    category: MealCategory;

}


export default function MealCategoryCard({ category }: Props) {

    const navigate = useNavigate();
    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                hover:shadow-xl
                transition
                cursor-pointer
            "
            onClick={() => navigate(`/meals/category/${category.id}`)}
        >

            <h2
                className="
                    text-2xl
                    font-bold
                    text-green-700
                "
            >
                {category.name}
            </h2>


            <p
                className="
                    mt-3
                    text-gray-600
                "
            >
                {category.description}
            </p>


            <button
                className="
                    mt-6
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-6
                    py-2
                    rounded-xl
                "
            >

                Explore Meals

            </button>


        </div>

    );
}