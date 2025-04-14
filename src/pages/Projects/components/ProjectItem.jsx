import {useState} from "react";
import formatTime from "../../../helpers/formatTime";
import Dropdown from "../../../components/Dropdown/Dropdown";
import deleteImg from "../../../assets/delete.png";

export default function ProjectItem({myKey, name, project, start, end, all}) {
        const [newName, setNewName] = useState(name);
        const [newProject, setNewProject] = useState(project);
        const [newStart, setNewStart] = useState(start);
        const [newEnd, setNewEnd] = useState(end);
        const [newAll, setNewAll] = useState(all);

        function editItem(name = newName, project = newProject, start=newStart, end=newEnd, all=newAll){
            localStorage.setItem(myKey, `${name}^${project}^${start}^${end}^${all}`);
        }

        function editTime(e, start){
            if(!e.target.value.includes(":") || e.target.value.length > 5) return;
            if(start) setNewStart(e.target.value);
            else setNewEnd(e.target.value);
            let startArr = [];
            let endArr = [];
            if(start) { 
                startArr = e.target.value.split(":");
                endArr = newEnd.split(":");
            }
            else {
                startArr = newStart.split(":");
                endArr = e.target.value.split(":");
            }
            let res = e.target.value.split(":");
            res[0] = res[0].padStart(2, "0");
            res[1] = res[1].padStart(2, "0");
            res = res.join(":");
            console.log(startArr, endArr);
            let myAll = Math.abs((+endArr[0] * 60 * 60 + +endArr[1] * 60) - (+startArr[0] * 60 * 60 + +startArr[1] * 60));
            console.log("-----");
            console.log(myAll);
            setNewAll(myAll);
            if(start) editItem(newName, newProject, res, newEnd, myAll);
            else editItem(newName, newProject, newStart, res, myAll);
        }

        const [isHidden, setIsHidden] = useState(false);
        return (
            <div className={isHidden ? "titem none" : "titem"}>
                <div className="titem__edit">
                    <input type="text" value={newName} onChange={(e) => {
                        setNewName(e.target.value);
                        editItem(e.target.value);
                    }} />
                    <Dropdown startValue={newProject} editProject={(value) => {
                        setNewProject(value);
                        editItem(newName, value);
                        }}/>
                </div>
                <div className="titem__info">
                    <div className="titem__time"><input type="text" value ={newStart} onChange={(e) => editTime(e, true)}/> <p>-</p> <input type="text" value={newEnd} onChange={(e) => editTime(e,false)}/></div>
                    <div className="titem__delete">
                        <p>{formatTime(newAll)}</p>
                        <img src={deleteImg} onClick={() => {
                            localStorage.removeItem(myKey);
                            setIsHidden(true);
                        }}/>
                    </div>
                </div>
            </div>
        );
    }