import { useState } from "react"

export default function DropAdd({ makeRender }) {
    const [projectValue, setProjectValue] = useState("")
    const isEn = localStorage.getItem("settings-lang") === "en";

    function addProject() {
        if (projectValue.toLowerCase() === "without project" || projectValue.toLowerCase() === "без проєкту" || projectValue.toLowerCase() === "all" || projectValue.toLowerCase() === "всі") return
        let smallName = projectValue
        if (projectValue.length > 45) smallName = projectValue.substring(0, 44) + "..."
        let newName = smallName.replace(/(@|\^)+/g, ".");
        let readProjects = localStorage.getItem("tracker-projects");
        let arr = readProjects.split("^");
        let counter = 1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === smallName) counter++;
        }
        if (counter > 1 || projectValue.length === 0) return;
        if (readProjects.length === 0) {
            localStorage.setItem("tracker-projects", `${newName}`);
        } else {
            localStorage.setItem("tracker-projects", `${localStorage.getItem("tracker-projects")}^${newName}`);
        }
        makeRender()
        setProjectValue("")
    }

    return (
        <div className="dropdown__add" onClick={(e) => e.stopPropagation()}>
            <input type="text" placeholder={isEn ? "Enter a name of project" : "Введіть назву проєкту"} value={projectValue} onChange={(e) => setProjectValue(e.target.value)} />
            <div className="dropdown__create" onClick={addProject}>{isEn ? "Create" : "Створити"} +</div>
        </div>)
}