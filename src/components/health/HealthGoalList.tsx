import { useEffect, useState } from "react";
import { getHealthGoals } from "../../services/healthGoalService";
import HealthGoalCard from "./HealthGoalCard";
import type { HealthGoal } from "../../types/HealthGoal";


function HealthGoalList() {

    const [goals, setGoals] = useState<HealthGoal[]>([]);


    useEffect(() => {

        getHealthGoals()
            .then(data => {
                setGoals(data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);



    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {
                goals.map(goal => (

                    <HealthGoalCard
                        key={goal.id}
                        goal={goal}
                    />

                ))
            }

        </div>

    );

}


export default HealthGoalList;