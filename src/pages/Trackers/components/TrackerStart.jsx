import { useState} from "react";
import Start from "./Start";
import Dropdown from "../../../components/Dropdown/Dropdown";

export default function TrackerStart({changeAdd}) {

    const isEn = localStorage.getItem("settings-lang") === "en";


    const [name, setName] = useState(localStorage.getItem("tracker-name"));
    const [project, setProject] = useState(localStorage.getItem("tracker-project") === null ? "Без проєкту" : localStorage.getItem("tracker-projects").split("^")[0]); // Треба зробити щоб спочатку було СТАНДАРТНЕ ЗНАЧЕННЯ коли будуть проекти зберігатися, array[0]
    const changeProject = value => setProject(value);

    const [time, setTime] = useState(+localStorage.getItem("tracker-time"));
    const changeTime = value => setTime(value);

    let startTime = "00:00";
    let endTime = "00:00";
    function addItem(){
        let smallName = name
        if(name.length > 30) smallName = name.substring(0, 29) + "..."
        let newName = smallName?? smallName.replace(/(@|\^)+/g, ".");
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
        localStorage.setItem("tracker-time", "0")
    }
    function devAdd(j){
        console.log("Dev function is activated.")
        for(let i = 0; i < j; i++){
            addItem()
            console.log("+")
            setName(j)
        }
    }
    
    return (
        <div className="trackers__add newblock">
            <div className="trackers__info">
                <input type="text" placeholder={isEn ? "What are you doing right now?" : "Чим Ви зараз займаєтесь?"} onChange={(e) => {
                    setName(e.target.value);
                    localStorage.setItem("tracker-name", e.target.value)
                }} value={name} />
                <Dropdown changeProject={changeProject}/>
            </div>
            <Start changeTime={changeTime} addItem={addItem} devAdd={() => devAdd(0)}/>
        </div>
    );
}