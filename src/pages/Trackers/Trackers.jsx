import { useState} from "react";
import TrackerStart from "./components/TrackerStart";
import TrackerList from "./components/TrackerList";
import "./Trackers.css";

export default function Trackers() {
    if (localStorage.getItem("tracker-index") === null) {
        localStorage.setItem("tracker-index", "0");
    }
    if (localStorage.getItem("tracker-projects") === null) {
        localStorage.setItem("tracker-projects", "Без проєкту");
    }
    const [isAdding, setIsAdding] = useState(false); // чисто щоб рендерити наново компонент
    return (
        <div className="trackers content">
            <TrackerStart changeAdd={() => setIsAdding(!isAdding)} />
            <TrackerList />
        </div>
    );
}