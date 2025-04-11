import { useState } from "react";
import start from "../../assets/projectstart.png";
import "./Projects.css";

export default function TrackerStart({update}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState("");
    function addProject() {
        let newName = name.replace(/(@|\^)+/g, ".");
        let readProjects = localStorage.getItem("tracker-projects");
        let arr = readProjects.split("^");
        let counter = 1;
        for(let i = 0; i < arr.length; i++){
            if(arr[i] === name) counter++;
        }
        if(counter > 1 || name.length === 0 || name.length > 30) return;
        if(readProjects.length === 0){
            localStorage.setItem("tracker-projects", `${newName}`);
        } else {
            localStorage.setItem("tracker-projects", `${localStorage.getItem("tracker-projects")}^${newName}`);
        }
    }
    return (
        <div className="trackers__add project__add">
            <div className="trackers__info">
                <input type="text" placeholder={isEn ? "Project Name" : "Назва проєкту"} value ={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="trackers__start">
                <img src={start} alt="start" onClick={() => {
                    addProject();
                    update();
                }} />
            </div>
        </div>
    );
}