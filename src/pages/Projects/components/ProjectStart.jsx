import { useState } from "react";
import start from "../../../assets/projectstart.png";

export default function TrackerStart({update}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState("");
    function addProject() {
        let smallName = name
        if(name.length > 45) smallName = name.substring(0, 44) + "..."
        let newName = smallName.replace(/(@|\^)+/g, ".");
        let readProjects = localStorage.getItem("tracker-projects");
        let arr = readProjects.split("^");
        let counter = 1;
        for(let i = 0; i < arr.length; i++){
            if(arr[i] === smallName) counter++;
        }
        if(counter > 1 || name.length === 0) return;
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