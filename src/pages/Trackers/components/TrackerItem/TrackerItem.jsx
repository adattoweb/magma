import { useState } from "react";
import formatTime from "@/helpers/formatTime";
import Dropdown from "@/components/Dropdown/Dropdown";
import deleteImg from "@/assets/delete.png";

export default function TrackerItem({ localKey, isRender, setIsRender}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, project, start, end, all] = localStorage.getItem(localKey).split("^")
    const [newName, setNewName] = useState(name);
    const [newProject, setNewProject] = useState(project);
    const [newStart, setNewStart] = useState(start);
    const [newEnd, setNewEnd] = useState(end);
    const [newAll, setNewAll] = useState(all);

    function editItem(name = newName, project = newProject, start = newStart, end = newEnd, all = newAll) {
        localStorage.setItem(localKey, `${name}^${project}^${start}^${end}^${all}`);
    }

    function editTime(e, start) {
        if (!e.includes(":") || e.length > 5) return;
        if (+e.split(":")[1][0] >= 6) return;
        if (start) setNewStart(e);
        else setNewEnd(e);
        let startArr = [];
        let endArr = [];
        if (start) {
            startArr = e.split(":");
            endArr = newEnd.split(":");
        }
        else {
            startArr = newStart.split(":");
            endArr = e.split(":");
        }
        let res = e.split(":");
        res[0] = res[0].padStart(2, "0");
        res[1] = res[1].padStart(2, "0");
        res = res.join(":");
        let myAll = Math.abs((+endArr[0] * 60 * 60 + +endArr[1] * 60) - (+startArr[0] * 60 * 60 + +startArr[1] * 60));
        setNewAll(myAll);
        if (start) editItem(newName, newProject, res, newEnd, myAll);
        else editItem(newName, newProject, newStart, res, myAll);
    }
    const localProjects = localStorage.getItem("tracker-projects")
    const array = localProjects === null ? [] : localProjects.split("^")
    const [select, setSelect] = useState(newProject)

    return (
        <div className="titem">
            <div className="titem__edit">
                <input type="text" className="titem__name" value={newName} onChange={(e) => {
                    setNewName(e.target.value);
                    editItem(e.target.value);
                }} />
                <Dropdown name={select}>
                    {array.map((el, index) => <p onClick={() => {
                        setSelect(el);
                        setNewProject(el)
                        editItem(newName, el)
                    }} key={el + index}>{isEn && el === "Без проєкту" ? "Without project" : el}</p>)}
                </Dropdown>
            </div>
            <div className="titem__info">
                <div className="titem__time">
                    <input type="text" value={newStart} onChange={(e) => editTime(e.target.value, true)} />
                    <p>-</p>
                    <input type="text" value={newEnd} onChange={(e) => editTime(e.target.value, false)} />
                </div>
                <div className="titem__delete">
                    <p>{formatTime(newAll)}</p>
                    <img draggable={false} src={deleteImg} onClick={() => {
                        localStorage.removeItem(localKey);
                        setIsRender(!isRender);
                    }} />
                </div>
            </div>
        </div>
    );
}
{/* <Dropdown startValue={newProject} editProject={(value) => {
    setNewProject(value);
    editItem(newName, value);
}} /> */}