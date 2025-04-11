import { useState} from "react";
import "./Projects.css";
import ProjectStart from "./ProjectStart";
import ProjectList from "./ProjectList";

export default function Trackers() {
    if (localStorage.getItem("tracker-index") === null) {
        localStorage.setItem("tracker-index", "0");
    }
    if (localStorage.getItem("tracker-projects") === null) {
        localStorage.setItem("tracker-projects", "Без проєкту");
    }
    const [isAdding, setIsAdding] = useState(false); // чисто щоб рендерити наново компонент
    return (
        <div className="trackers content project">
            <ProjectStart update={() => setIsAdding(!isAdding)} />
            <ProjectList />
        </div>
    );
}