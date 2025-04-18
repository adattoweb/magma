import "./Analytics.css"
import Dropdown from "./components/Dropdown";
import triangle from "../../assets/triangle.png";
import sortTrackers from "./helpers/sortTrackers"
import diffDays from "./helpers/diffDays"
import uniqueArray from "./helpers/uniqueArray";

import AnalyticsBlock from "./components/AnalyticsBlock";
import AnalyticsItem from "./components/AnalyticsItem"
import FooterItem from "./components/FooterItem"

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

    let uniqueArr = uniqueArray(array)

    // console.log(uniqueArr);
    // console.log(timeAll);
    const timeHour = (Math.floor(timeAll / 3600) + "").padStart(2, "0"); // Вираховуємо години
    const timeMin = (Math.floor((timeAll % 3600) / 60) + "").padStart(2, "0"); // Вираховуємо хвилини

    return (
        <div className={+days === 14 ? `analytics content bigAnal` : `analytics content`}>
            <div className='analytics__block newblock'>
                <div className='analytics__header'>
                    <p className='analytics__time'>{isEn ? "Total:" : "Всього:"} {timeHour}:{timeMin} </p>
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
                    {arrayKeys.length === 0 ? <p className='error'>{isEn ? "Unfortunately, there's nothing here" : "Нажаль, тут нічого нема"}</p> : arrayKeys.map((el, index) => {
                        let allTime = 0;
                        for (let i = 0; i < array[index].length; i++) {
                            let arrLocal = localStorage.getItem(array[index][i]).split("^");
                            if (arrLocal[1] === project || project === "Всі") allTime += +arrLocal[4];
                        }
                        if (allTime === 0) return;
                        return <AnalyticsBlock key={el + index} date={el} allTime={allTime} maxHeight={maxHeight}>{
                            array[index].map(key => {
                                let arrLocal = localStorage.getItem(key).split("^");
                                let time = +arrLocal[4];
                                let elProject = arrLocal[1];
                                if (elProject !== project && project !== "Всі") return;
                                if (time === 0) return;
                                return <AnalyticsItem key={key} local={localStorage.getItem(key)} allTime={allTime} maxHeight={maxHeight} uniqueArr={uniqueArr} />;
                            })}</AnalyticsBlock>;
                    })}
                </div>
                <div className='analytics__footer'>
                    {uniqueArr.map((el, index) => {
                        return <FooterItem key={el + index} str={el} />;
                    })}
                </div>
            </div>
        </div>
    );    
}