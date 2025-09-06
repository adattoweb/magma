import { useState } from "react";
import Start from "../Start/Start";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function TrackerStart({ changeAdd }) {

    const isEn = localStorage.getItem("settings-lang") === "en";

    const localProjects = localStorage.getItem("tracker-projects")

    const [name, setName] = useState(localStorage.getItem("tracker-name"));
    const [project, setProject] = useState(localProjects === null ? isEn ? "Without project" : "Без проєкту" : localProjects.split("^")[0]); // Треба зробити щоб спочатку було СТАНДАРТНЕ ЗНАЧЕННЯ коли будуть проекти зберігатися, array[0]

    const [time, setTime] = useState(+localStorage.getItem("tracker-time"));

    function changeName(e){
        setName(e.target.value);
        localStorage.setItem("tracker-name", e.target.value)
    }


    const array = localProjects === null ? [] : localProjects.split("^")
    console.log(array, project)
    // const [select, setSelect] = useState(isEn ? "Without project" : "Без проєкту");
    
    return (
        <div className="trackers__add newblock">
            <div className="trackers__info">
                <input type="text" className="tstart__input" placeholder={isEn ? "What are you doing right now?" : "Чим Ви зараз займаєтесь?"} onChange={(e) => changeName(e)} value={name} />
                <Dropdown name={project}>
                    {array.map((el, index) => <p onClick={() => {
                        setProject(el)
                        console.log(el)
                    }} key={el + index}>{isEn && el === "Без проєкту" ? "Without project" : el}</p>)}
                </Dropdown>
            </div>
            <Start time={time} setTime={setTime} name={name} changeAdd={changeAdd} project={project}/>
        </div>
    );
}