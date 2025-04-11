import { useState} from "react";
import "./Goals.css";
import GoalsStart from "./GoalsStart";
import GoalsList from "./GoalsList";

export default function Trackers() {
    if (localStorage.getItem("goals-index") === null) {
        localStorage.setItem("goals-index", "1");
    }
    const [isAdding, setIsAdding] = useState(false); // чисто щоб рендерити наново компонент
    return (
        <div className="trackers content project">
            <GoalsStart update={() => setIsAdding(!isAdding)} />
            <GoalsList />
        </div>
    );
}