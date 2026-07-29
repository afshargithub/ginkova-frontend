import type { HealthGoal } from "../../types/HealthGoal";


interface Props {
    goal: HealthGoal;
}


function HealthGoalCard({ goal }: Props) {

    return (
        <div className="bg-white rounded-xl shadow-md p-5 m-3">

            <div className="text-3xl mb-3">
                {goal.icon}
            </div>

            <h3 className="text-xl font-bold text-green-700">
                {goal.name}
            </h3>

            <p className="text-gray-600 mt-2">
                {goal.description}
            </p>

            <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">

                Explore

            </button>

        </div>
    );
}


export default HealthGoalCard;