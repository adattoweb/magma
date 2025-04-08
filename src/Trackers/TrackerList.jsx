import "./Trackers.css";
import { useState } from "react";
import formatTime from "../helpers/formatTime";
import Dropdown from "../Dropdown/Dropdown";
import deleteImg from "../assets/delete.png";
import getDayDiff from "../helpers/getDayDiff";

export default function TrackerList() {    
    const isEn = localStorage.getItem("settings-lang") === "en";

    const [isRender, setIsRender] = useState(false);
    let array = [];
    let arrayKeys = [];
    for (let key in localStorage) {
        if(!key.includes("tracker-item")) continue;
        let date = key.split("^")[1];
        if (date === undefined) {
            continue;
        }
        if(!arrayKeys.includes(date)){
            arrayKeys.push(date);
            array.push([key]);
        } else{
            array[arrayKeys.indexOf(date)].push(key);
        }
    }

    // Сортування
    for (let i = 0; i < array.length; i++) {
        array[i].sort((a, b) => {
            let indexA = parseInt(a.split("^")[0].replace(/\D/g, ""));
            let indexB = parseInt(b.split("^")[0].replace(/\D/g, ""));
            return indexB - indexA; 
        });
    }

    function TrackerBlock({ header, children, all }) {
        let dayDiff = getDayDiff(header);
        let displayHeader = dayDiff === 0 ? (isEn ? "Today" : "Сьогодні")
                         : dayDiff === 1 ? (isEn ? "Yesterday" : "Вчора")
                         : dayDiff === 2 ? (isEn ? "Day before yesterday" : "Позавчора")
                         : header;

        return (
            <div className="tblock">
                <div className="tblock__header">
                    <p>{displayHeader}</p>
                    <p>{isEn ? "Total" : "Всього"}: <span>{formatTime(all)}</span></p>
                </div>
                <div className="tblock__list">
                    {children}
                </div>
            </div>
        );
    }

    function TrackerItem({myKey, name, project, start, end, all}) {
        const [newName, setNewName] = useState(name);
        const [newProject, setNewProject] = useState(project);
        const [newStart, setNewStart] = useState(start);
        const [newEnd, setNewEnd] = useState(end);
        const [newAll, setNewAll] = useState(all);

        function editItem(name = newName, project = newProject, start=newStart, end=newEnd, all=newAll){
            localStorage.setItem(myKey, `${name}^${project}^${start}^${end}^${all}`);
        }

        function editTime(e, start){
            if(!e.includes(":") || e.length > 5) return;
            if(+e.split(":")[1][0] >= 6) return;
            if(start) setNewStart(e);
            else setNewEnd(e);
            let startArr = [];
            let endArr = [];
            if(start) { 
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
            if(start) editItem(newName, newProject, res, newEnd, myAll);
            else editItem(newName, newProject, newStart, res, myAll);
        }

        return (
            <div className="titem">
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
                    <div className="titem__time">
                        <input type="text" value ={newStart} onChange={(e) => editTime(e.target.value, true)}/> 
                        <p>-</p> 
                        <input type="text" value={newEnd} onChange={(e) => editTime(e.target.value,false)}/>
                    </div>
                    <div className="titem__delete">
                        <p>{formatTime(newAll)}</p>
                        <img src={deleteImg} onClick={() => {
                            localStorage.removeItem(myKey);
                            setIsRender(!isRender);
                        }}/>
                    </div>
                </div>
            </div>
        );
    }

    function sortTrackers(arrayKeys, array) {
        let combined = arrayKeys.map((key, index) => ({ key, items: array[index] }));
    
        combined.sort((a, b) => {
            let [dayA, monthA, yearA] = a.key.split(".").map(Number);
            let [dayB, monthB, yearB] = b.key.split(".").map(Number);
            return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA); // Сортуємо по спаданням
        });
    
        return {
            sortedKeys: combined.map(el => el.key),
            sortedArray: combined.map(el => el.items),
        };
    }

    let { sortedKeys, sortedArray } = sortTrackers(arrayKeys, array);
    arrayKeys = sortedKeys;
    array = sortedArray;

    return (
        <div className="tlist">
            <div className="tlist__header">
                {isEn ? "This Week" : "Цим тижнем"}
            </div>
            <div className="tlist__list">
                {arrayKeys.length === 0 ? <p className="error">{isEn ? "Sorry, nothing here" : "Нажаль, тут нічого нема"}</p> : arrayKeys.map((el, index) => {
                    let allTime = array[index].reduce((total, key) => total + +localStorage.getItem(key).split("^")[4],0);
                   return <TrackerBlock key={el+index} header={el.split(".").map(el => el.padStart(2, "0")).join(".")} all={allTime}>{
                    array[index].map(key => {
                        let now = localStorage.getItem(key).split("^");
                        return <TrackerItem key={key} myKey={key} name = {now[0]} project = {now[1]} start = {now[2]} end = {now[3]} all = {now[4]}/>;
                   })}</TrackerBlock>;
                })}
            </div>
        </div>
    );
}
