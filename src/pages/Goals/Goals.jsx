import { useState } from "react";
import GoalsStart from "./components/GoalsStart";
import GoalsList from "./components/GoalsList";
import "./Goals.css";

export default function Goals() {
    if (localStorage.getItem("goals-index") === null) {
        localStorage.setItem("goals-index", "1");
    }
    const localGoals = localStorage.getItem("goals-list")
    const [array, setArray] = useState(localGoals === null ? [] : localGoals.split("^"))
    return (
        <div className="trackers content">
            <GoalsStart setArray={setArray}/>
            <GoalsList array={array} setArray={setArray}/>
        </div>
    );
}