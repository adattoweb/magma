import { useState } from "react";
import start from "@/assets/projectstart.png";

import addItem from "../helpers/addItem";

export default function TrackerStart({ update }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState("");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1);

    function onClick(){
        if((min + "").length > 0 && (max + "").length > 0){
            addItem(name, min, max)
            update();
        } 
    }
    
    return (
        <div className="goals__add trackers__add project__add newblock">
            <div className="trackers__info">
                <input type="text" className="tstart__input" placeholder={isEn ? "Goal Name" : "Назва цілі"} value={name} onChange={(e) => setName(e.target.value)} />
                <div className="goals__limit">
                    <input className="gstart__input" type="number" value={min} onChange={(e) => setMin(e.target.value)}/>
                    <hr className="gdevider"/>
                    <input className="gstart__input" type="number" value={max} onChange={(e) => setMax(e.target.value)}/>
                </div>
            </div>
            <div className="trackers__start">
                <img draggable={false} src={start} alt={isEn ? "Start" : "Почати"} onClick={onClick}/>
            </div>
        </div>
    );
}