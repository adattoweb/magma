import "./Analytics.css"

import triangle from "@/assets/triangle.png";

import sortTrackers from "./helpers/sortTrackers"
import diffDays from "./helpers/diffDays"
import switchDay from "./helpers/switchDay";
import getColors from "./helpers/getColors";
import getAllTime from "./helpers/getAllTime";
import getDays from "./helpers/getDays";
import getObjectDates from "./helpers/getObjectDates";
import getMax from "./helpers/getMax";

import AnalyticsBlock from "./components/AnalyticsBlock";
import Dropdown from "./components/Dropdown";

import { useState, useRef } from "react";
import getObjectTasks from "./helpers/getObjectTasks";
import conSecTime from "./helpers/conSecTime";

export default function Analytics() {
    console.log("Analytics render")

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [days, setDays] = useState(7);
    const width =  window.innerWidth
    const maxHeight = width >= 540 ? 100 : window >= 430 ? 80 : 50
    const [project, setProject] = useState("Всі");

    const page = useRef(1);

    let timeAll = 0;
    let array = []; // масив для групування за датами
    let arrayDates = [];

    [timeAll, array, arrayDates] = diffDays(timeAll, days, array, arrayDates)

    // console.log(array);
    // console.log(arrayKeys);

    let { sortedKeys, sortedArray } = sortTrackers(arrayDates, array);
    arrayDates = sortedKeys;
    array = sortedArray;

    const daysArray = getDays(days) // видає масив з днями

    let objectDates = getObjectDates(arrayDates, daysArray, array)

    let uniqueColors = getColors(array)

    const timeHour = (Math.floor(timeAll / 3600) + "").padStart(2, "0"); // Вираховуємо години
    const timeMin = (Math.floor((timeAll % 3600) / 60) + "").padStart(2, "0"); // Вираховуємо хвилини

    let max = getMax(objectDates, project)

    const now = new Date()
    const today = `${now.getDate()}.${(now.getMonth() + 1)}.${now.getFullYear()}`

    const options = { weekday: "short", day: "numeric", month: "long" };

    console.log(objectDates)

    const todayData = [objectDates[today] !== undefined && (objectDates[today].length === 0 ? conSecTime(0) : conSecTime(getAllTime(today, objectDates, project)), now.toLocaleString(undefined, options))]
    console.log(today)
    console.log(arrayDates)

    const [selected, setSelected] = useState(today)
    const [selectedData, setSelectedData] = useState(todayData)

    return (
        <div className="analytics content">
            <div className='analytics__block newblock'>
                <div className='analytics__header'>
                    <div className="analytics__left">
                        <p>{selectedData[1]}</p>
                    </div>
                    <div className="analytics__right">
                        <p className='analytics__time'>{isEn ? "Total" : "Всього"} {timeHour}:{timeMin} </p>
                        <Dropdown changeProject={(el) => setProject(el)} startValue={isEn ? "All" : "Всі"} />
                    </div>
                </div>
                <div className='analytics__content'>
                    <h3 className="analytics__hours">{selectedData[0]}</h3>
                     {Object.keys(objectDates).map((el, index) => {
                        let allTime = getAllTime(el, objectDates, project);
                        if(allTime > max) max = allTime
                        console.log(allTime, max)
                        if (!arrayDates.includes(el) || allTime < 60){
                            return <AnalyticsBlock key={el + index} date={el} allTime={allTime} maxHeight={maxHeight} isGray={true} selected={selected} 
                            setSelected={setSelected} setSelectedData={setSelectedData}/>
                        }
                         let objectTasks = getObjectTasks(objectDates, el)
                         return <AnalyticsBlock key={el + index} date={el} allTime={allTime} max={max} maxHeight={maxHeight} objectTasks={objectTasks} project={project}
                             uniqueColors={uniqueColors} selected={selected} setSelected={setSelected} setSelectedData={setSelectedData} />
                     })}
                </div>
                <div className='analytics__action'>
                    <p>{(page.current - 1) * -1}</p>
                    <img draggable={false} src={triangle} onClick={() => switchDay(setDays, page, true)} />
                    <img draggable={false} src={triangle} onClick={() => switchDay(setDays, page, false)} />
                </div>
            </div>
        </div>
    );
}