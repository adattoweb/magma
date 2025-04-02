import { useState} from "react";
import "./Tier.css";
import TierStart from "./TierStart";
import TierList from "./TierList";

export default function Trackers() {
    if (localStorage.getItem("tier-index") === null) {
        localStorage.setItem("tier-index", "1");
    }
    const [isAdding, setIsAdding] = useState(false); // чисто щоб рендерити наново компонент
    return (
        <div className="trackers content project">
            <TierStart update={() => setIsAdding(!isAdding)} />
            <TierList />
        </div>
    );
}