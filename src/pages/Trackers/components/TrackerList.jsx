import { useState } from "react";
import TrackerBlock from "./TrackerBlock";
import TrackerItem from "./TrackerItem";
import sortTrackers from "../helpers/sortTrackers";

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
                        return <TrackerItem key={key} myKey={key} name = {now[0]} project = {now[1]} start = {now[2]} end = {now[3]} all = {now[4]} isRender={isRender} setIsRender={setIsRender}/>;
                   })}</TrackerBlock>;
                })}
            </div>
        </div>
    );
}
