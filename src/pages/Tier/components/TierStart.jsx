import { useState } from "react";
import start from "../../../assets/projectstart.png";

export default function TrackerStart({update}) {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначаємо мову
    const [name, setName] = useState("");
    function addProject() {
        let smallName = name
        if(name.length > 60) smallName = name.substring(0, 44) + "..."
        let newName = smallName.replace(/(@|\^)+/g, ".");
        let readProjects = localStorage.getItem("tier-list") ?? [];
        let arr = readProjects.split("^").map(el => el.split("@"));
        let counter = 1;
        for(let i = 0; i < arr.length; i++){
            if(arr[i][0] === smallName) counter++;
        }
        if(counter > 1 || name.length === 0) return;
        let index = localStorage.getItem("tier-index");
        localStorage.setItem("tier-index", +index+1);
        if(readProjects.length === 0){
            localStorage.setItem("tier-list", `${newName}@${index}`);
        } else {
            localStorage.setItem("tier-list", `${localStorage.getItem("tier-list")}^${newName}@${index}`);
        }
    }
    return (
        <div className="trackers__add project__add newblock">
            <div className="trackers__info">
                <input type="text" placeholder={isEn ? "Task Name" : "Назва задачі"} value ={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="trackers__start">
                <img src={start} alt={isEn ? "start" : "почати"} onClick={() => {
                    addProject();
                    update();
                }} />
            </div>
        </div>
    );
}