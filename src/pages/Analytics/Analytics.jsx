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
import FooterItem from "./components/FooterItem"
import Dropdown from "./components/Dropdown";

import { useState, useRef } from "react";
import getObjectTasks from "./helpers/getObjectTasks";

export default function Analytics() {
    console.log("Analytics render")

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [days, setDays] = useState(7);
    const maxHeight = 100
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

    console.log(array)

    return (
        <div className={+days === 14 ? `analytics content bigAnal` : `analytics content`}>
            <div className='analytics__block newblock'>
                <div className='analytics__header'>
                    <p className='analytics__time'>{isEn ? "Total" : "Всього"} {timeHour}:{timeMin} </p>
                    <Dropdown changeProject={(el) => setProject(el)} startValue={"Всі"} />
                    <div className='analytics__action'>
                        <p>{(page.current - 1) * -1}</p>
                        <img draggable={false} src={triangle} onClick={() => switchDay(setDays, page, true)} />
                        <img draggable={false} src={triangle} onClick={() => switchDay(setDays, page, false)} />
                    </div>
                </div>
                <div className='analytics__content'>
                     {Object.keys(objectDates).map((el, index) => {
                        let allTime = getAllTime(el, objectDates, project);
                        if(allTime > max) max = allTime
                        console.log(allTime, max)
                        if (!arrayDates.includes(el) || allTime < 60){
                            return <AnalyticsBlock key={el + index} date={el} allTime={allTime} maxHeight={maxHeight} isGray={true}/>
                        }
                        let objectTasks = getObjectTasks(objectDates, el)
                        return <AnalyticsBlock key={el + index} date={el} allTime={allTime} max={max} maxHeight={maxHeight} objectTasks={objectTasks} project={project} uniqueColors={uniqueColors}/>
                    })}
                </div>
                <div className='analytics__footer'>
                    {uniqueColors.map((el, index) => {
                        let array = el.split("^")
                        return <FooterItem key={el + index} name={array[0]} color={array[1]}  />;
                    })}
                </div>
            </div>
        </div>
    );    
}