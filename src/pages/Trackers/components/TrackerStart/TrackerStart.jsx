import { useState} from "react";
import Start from "../Start/Start";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function TrackerStart({ changeAdd }) {

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [name, setName] = useState(localStorage.getItem("tracker-name"));
    const [project, setProject] = useState(localStorage.getItem("tracker-project") === null ? "Без проєкту" : localStorage.getItem("tracker-projects").split("^")[0]); // Треба зробити щоб спочатку було СТАНДАРТНЕ ЗНАЧЕННЯ коли будуть проекти зберігатися, array[0]
    const changeProject = value => setProject(value);

    const [time, setTime] = useState(+localStorage.getItem("tracker-time"));

    function changeName(e){
        setName(e.target.value);
        localStorage.setItem("tracker-name", e.target.value)
    }
    
    return (
        <div className="trackers__add newblock">
            <div className="trackers__info">
                <input type="text" className="tstart__input" placeholder={isEn ? "What are you doing right now?" : "Чим Ви зараз займаєтесь?"} onChange={(e) => changeName(e)} value={name} />
                <Dropdown changeProject={changeProject}/>
            </div>
            <Start time={time} setTime={setTime} name={name} changeAdd={changeAdd} project={project}/>
        </div>
    );
}