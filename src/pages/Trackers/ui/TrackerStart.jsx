import { useState} from "react";
import Start from "./Start";
import Dropdown from "../../../components/Dropdown/Dropdown";

export default function TrackerStart({changeAdd}) {

    const isEn = localStorage.getItem("settings-lang") === "en";


    const [name, setName] = useState("");
    const [project, setProject] = useState(localStorage.getItem("tracker-project") === null ? "Без проєкту" : localStorage.getItem("tracker-projects").split("^")[0]); // Треба зробити щоб спочатку було СТАНДАРТНЕ ЗНАЧЕННЯ коли будуть проекти зберігатися, array[0]
    const changeProject = value => setProject(value);

    const [time, setTime] = useState(0);
    const changeTime = value => setTime(value);

    let startTime = "00:00";
    let endTime = "00:00";
    function addItem(){
        if (name.length > 30) return;
        let newName = name.replace(/(@|\^)+/g, ".");
        startTime = localStorage.getItem("start-time");
        const now = new Date();
        endTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        let mustName = name.length === 0 ? isEn ? "Without name" : "Без назви" : newName;
        let index = localStorage.getItem("tracker-index");
        if(index === null){
            index = "0";
        }
        localStorage.setItem(`tracker-item${index}^${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`, `${mustName}^${project}^${startTime}^${endTime}^${time}`);
        localStorage.setItem("tracker-index", +index + 1 + "");
        setTime(0);
        changeAdd();
    }
    
    return (
        <div className="trackers__add">
            <div className="trackers__info">
                <input type="text" placeholder={isEn ? "What are you doing right now?" : "Чим Ви зараз займаєтесь?"} onChange={(e) => { setName(e.target.value); }} value={name} />
                <Dropdown changeProject={changeProject}/>
            </div>
            <Start changeTime={changeTime} addItem={addItem}/>
        </div>
    );
}