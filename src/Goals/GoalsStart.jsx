import { useState } from "react";
import start from "../assets/projectstart.png";
import "./Goals.css";

export default function TrackerStart({ update }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState("");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1);
    function addProject() {
        if(min < 0 || max <= 0) return
        let newName = name.replace(/(@|\^)+/g, ".");
        let readProjects = localStorage.getItem("goals-list") ?? "";
        let arr = readProjects.split("^").map(el => el.split("@"));
        let counter = 1;
        for (let i = 0; i < arr.length; i++) { // шукаємо повторення, якщо є то зупиняємо додавання.
            if (arr[i][0] === name) counter++;
        }
        if (counter > 1 || name.length === 0 || name.length > 30) return;
        let index = localStorage.getItem("goals-index");
        localStorage.setItem("goals-index", +index + 1);
        if (readProjects.length === 0) {
            localStorage.setItem("goals-list", `${newName}@${index}@${min}@${max}`);
        } else {
            localStorage.setItem("goals-list", `${localStorage.getItem("goals-list") }^${newName}@${index}@${min}@${max}`);
        }
        console.log(arr)
    }
    
    return (
        <div className="goals__add trackers__add project__add">
            <div className="trackers__info">
                <input 
                    type="text" 
                    placeholder={isEn ? "Goal Name" : "Назва цілі"} 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <div className="goals__limit">
                    <input 
                        type="number" 
                        value={min} 
                        onChange={(e) => setMin(e.target.value)}
                    />
                    <p>/</p>
                    <input 
                        type="number" 
                        value={max} 
                        onChange={(e) => setMax(e.target.value)}
                    />
                </div>
            </div>
            <div className="trackers__start">
                <img 
                    src={start} 
                    alt={isEn ? "Start" : "Почати"} 
                    onClick={() => {
                        if((min + "").length > 0 && (max + "").length > 0){
                            addProject();
                            update();
                        }
                    }} 
                />
            </div>
        </div>
    );
}