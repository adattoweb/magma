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

    const [page, setPage] = useState(0)
    const elementsOnPage = 15

    function PagesButton({num, page, onClick}){
        return <div className={page === num ? "tpages__button newblock choosed" : "tpages__button newblock"} onClick={onClick}>{num}</div>
    }

    let counterItems = 0;
    let pagesArray = []
    for(let i = 0; i < arrayKeys.length; i++){
        if(counterItems >= elementsOnPage) counterItems = 0
        if(counterItems === 0) pagesArray.push([])
        counterItems += array[i].length
        pagesArray[pagesArray.length - 1].push(arrayKeys[i])
    }
    const flatArray = pagesArray.flat()
    console.log(pagesArray)

    return (
        <div className="tlist newblock">
            <div className="tlist__header newblock">
                {isEn ? "This Week" : "Цим тижнем"}
            </div>
            <div className="tlist__list">
                {arrayKeys.length === 0 ? <p className="error">{isEn ? "Sorry, nothing here" : "Нажаль, тут нічого нема"}</p> : pagesArray[page].map((el, index) => {
                    let allTime = array[flatArray.indexOf(el)].reduce((total, key) => total + +localStorage.getItem(key).split("^")[4],0);
                        return <TrackerBlock key={el+index} header={el.split(".").map(el => el.padStart(2, "0")).join(".")} all={allTime}>{
                            array[flatArray.indexOf(el)].map(key => {
                                let now = localStorage.getItem(key).split("^");
                                return <TrackerItem key={key} myKey={key} name = {now[0]} project = {now[1]} start = {now[2]} end = {now[3]} all = {now[4]} isRender={isRender} setIsRender={setIsRender}/>;   
                        })}</TrackerBlock>;
                })}
            </div>
            {pagesArray.length > 1 && <div className="tpages">
                {pagesArray.map((el, index) => {
                    return <PagesButton key={index + el} page={page} num={index} onClick={() => setPage(index)}/>
                })}
            </div>}
        </div>
    );
}
// page === 1 indexes: elementsOnPage - elementsOnPage --> elementsOnPage-1
