import { useState} from "react";
import GoalsStart from "./components/GoalsStart";
import GoalsList from "./components/GoalsList";
import "./Goals.css";

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