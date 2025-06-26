import { useState } from "react";
import TrackerBlock from "../TrackerBlock/TrackerBlock";
import TrackerItem from "../TrackerItem/TrackerItem";
import Dropdown from "../Dropdown/Dropdown"

import sortTrackers from "../../helpers/sortTrackers";
import getArrays from "./helpers/getArrays";
import getPagesArray from "./helpers/getPagesArray";


export default function TrackerList() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [project, setProject] = useState(isEn ? "All" : "Всі")

    const [isRender, setIsRender] = useState(false);
    let arrayKeys = [];
    let arrayDates = [];
    [arrayKeys, arrayDates] = getArrays()

    // Сортування
    for (let i = 0; i < arrayKeys.length; i++) {
        arrayKeys[i].sort((a, b) => {
            let indexA = parseInt(a.split("^")[0].replace(/\D/g, ""));
            let indexB = parseInt(b.split("^")[0].replace(/\D/g, ""));
            return indexB - indexA; 
        });
    }

    let { sortedKeys, sortedArray } = sortTrackers(arrayDates, arrayKeys);
    arrayDates = sortedKeys;
    arrayKeys = sortedArray;

    const [page, setPage] = useState(0)
    const elementsOnPage = 15

    function PagesButton({num, page, onClick}){
        return <div className={page === num ? "tpages__button newblock choosed" : "tpages__button newblock"} onClick={onClick}>{num}</div>
    }

    arrayKeys = arrayKeys.map(el => el.filter(key => {
        return localStorage.getItem(key).split("^")[1] === project || (project === "All" || project === "Всі")
    })).filter(el => el.length > 0)
    let pagesArray = getPagesArray(arrayKeys, elementsOnPage, arrayDates)
    let flatArray = pagesArray.flat()
    flatArray = flatArray.filter((el, index) => arrayKeys[index].length > 0)
    pagesArray = pagesArray.map(el => el.filter(el => flatArray.includes(el)))

    return (
        <div className="tlist newblock">
            <div className="tlist__header newblock">
                <Dropdown project={project} setProject={setProject} setPage={setPage} setGlobalRender={() => setIsRender(!isRender)}/>
            </div>
            <div className="tlist__list">
                {arrayDates.length === 0 || pagesArray.length === 0 ? <p className="error">{isEn ? "Sorry, nothing here" : "Нажаль, тут нічого нема"}</p> : pagesArray[page].map((el, index) => {
                    console.log(el)
                    let allTime = arrayKeys[flatArray.indexOf(el)].reduce((total, key) => total + +localStorage.getItem(key).split("^")[4],0);
                        return <TrackerBlock key={el+index} header={el.split(".").map(el => el.padStart(2, "0")).join(".")} all={allTime}>{
                            arrayKeys[flatArray.indexOf(el)].map(key => {
                                return <TrackerItem key={key} localKey={key} isRender={isRender} setIsRender={setIsRender}/>
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
