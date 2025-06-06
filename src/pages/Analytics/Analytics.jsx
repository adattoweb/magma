import "./Analytics.css"

import triangle from "../../assets/triangle.png";
import sortTrackers from "./helpers/sortTrackers"
import diffDays from "./helpers/diffDays"
import uniqueArray from "./helpers/uniqueArray";

import AnalyticsBlock from "./components/AnalyticsBlock";
import FooterItem from "./components/FooterItem"
import Dropdown from "./components/Dropdown";

import { useState, useRef } from "react";

export default function Analytics() {
    console.log("Analytics render")

    let timeAll = 0;

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [days, setDays] = useState(7);
    // const [maxHeight, setMaxHeight] = useState(100); // у майбутньому
    const maxHeight = 100
    const [project, setProject] = useState("Всі");

    let array = []; // масив для групування за датами
    let arrayKeys = [];

    const page = useRef(1);
    // console.log(timeAll);

    [timeAll, array, arrayKeys] = diffDays(timeAll, days, array, arrayKeys)

    // console.log(array);
    // console.log(arrayKeys);

    let { sortedKeys, sortedArray } = sortTrackers(arrayKeys, array);
    arrayKeys = sortedKeys;
    array = sortedArray;

    const now = new Date(new Date().getTime() - 86400000 * (days - 7));
    console.log(now.getDate())
    let arrayAllKeys = []
    for(let i = 0; i < 7; i++){
        const date = new Date(now.getTime() - 86400000 * i)
        arrayAllKeys.push(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
    }

    arrayAllKeys = arrayAllKeys.reverse()

    let objectKeys = {}
    for(let i = 0; i < 7; i++){
        if(!arrayKeys.includes(arrayAllKeys[i])) objectKeys[arrayAllKeys[i]] = [];
        else {
            objectKeys[arrayAllKeys[i]] = array[arrayKeys.indexOf(arrayAllKeys[i])]
        }
    }
    console.log(array)
    console.log(arrayKeys)
    console.log(arrayAllKeys)
    console.log(objectKeys)

    let uniqueArr = uniqueArray(array)

    // console.log(uniqueArr);
    // console.log(timeAll);
    const timeHour = (Math.floor(timeAll / 3600) + "").padStart(2, "0"); // Вираховуємо години
    const timeMin = (Math.floor((timeAll % 3600) / 60) + "").padStart(2, "0"); // Вираховуємо хвилини

    let max = 0;

    function findAllTime(el){
        let allTime = 0;
        for (let i = 0; i < objectKeys[el].length; i++) {
            let arrLocal = localStorage.getItem(objectKeys[el][i]).split("^");
            if (arrLocal[1] === project || project === "Всі") allTime += +arrLocal[4];
        }
        return allTime
    }

    Object.keys(objectKeys).map(el => {
        let allTime = findAllTime(el)
        if(allTime > max) max = allTime
    })

    return (
        <div className={+days === 14 ? `analytics content bigAnal` : `analytics content`}>
            <div className='analytics__block newblock'>
                <div className='analytics__header'>
                    <p className='analytics__time'>{isEn ? "Total" : "Всього"} {timeHour}:{timeMin} </p>
                    <Dropdown changeProject={(el) => setProject(el)} startValue={"Всі"} />
                    <div className='analytics__action'>
                        <p>{(page.current - 1) * -1}</p>
                        <img src={triangle} onClick={() => {
                            setDays(days + 7);
                            page.current += 1;
                        }} />
                        <img src={triangle} onClick={() => {
                            if (page.current > 1) {
                                setDays(days - 7);
                                page.current -= 1;
                            }
                        }} />
                    </div>
                </div>
                <div className='analytics__content'>
                     {Object.keys(objectKeys).map((el, index) => {
                        let allTime = findAllTime(el);
                        if(allTime > max) max = allTime
                        console.log(allTime, max)
                        if (!arrayKeys.includes(el) || allTime === 0){
                            return <AnalyticsBlock key={el + index} date={el} allTime={allTime} maxHeight={maxHeight} isGray={true}/>
                        }
                        let objectTasks = {}
                        for(let i = 0; i < objectKeys[el].length; i++){
                            let nameTask = localStorage.getItem(objectKeys[el][i]).split("^")[0]
                            if(!objectTasks[nameTask]) objectTasks[nameTask] = [objectKeys[el][i]]
                            else objectTasks[nameTask].push(objectKeys[el][i]) 
                        }

                        console.log(objectKeys[el])
                        console.log(Object.values(objectKeys))

                        console.log(objectTasks)
                        return <AnalyticsBlock key={el + index} date={el} allTime={allTime} max={max} maxHeight={maxHeight} objectTasks={objectTasks} project={project} uniqueArr={uniqueArr}/>
                    })}
                </div>
                <div className='analytics__footer'>
                    {uniqueArr.map((el, index) => {
                        console.log(el)
                        return <FooterItem key={el + index} str={el} />;
                    })}
                </div>
            </div>
        </div>
    );    
}