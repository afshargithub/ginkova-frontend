import type { HealthGoal } from "../../types/HealthGoal";

interface Props {
    goal: HealthGoal;
}

export default function HealthGoalCard({
    goal,
}: Props) {
    const icon = goal.icon.trim() || "🎯";

    return (
        <article
            className="
                h-full
                rounded-2xl
                border
                border-green-100
                bg-white
                p-6
                shadow-md
                transition
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            <div
                aria-hidden="true"
                className="
                    mb-4
                    text-4xl
                "
            >
                {icon}
            </div>

            <h3
                className="
                    text-xl
                    font-bold
                    text-green-700
                "
            >
                {goal.name}
            </h3>

            {goal.description && (
                <p
                    className="
                        mt-3
                        leading-7
                        text-gray-600
                    "
                >
                    {goal.description}
                </p>
            )}
        </article>
    );
}