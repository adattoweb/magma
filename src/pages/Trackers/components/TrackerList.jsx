import { useState } from "react";
import TrackerBlock from "./TrackerBlock";
import TrackerItem from "./TrackerItem";
import sortTrackers from "../helpers/sortTrackers";
import Dropdown from "./Dropdown"


export default function TrackerList() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [project, setProject] = useState(isEn ? "All" : "Всі")

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
    array = array.map(el => el.filter(key => {
        return localStorage.getItem(key).split("^")[1] === project || (project === "All" || project === "Всі")
    })).filter(el => el.length > 0)
    for(let i = 0; i < array.length; i++){
        if(counterItems >= elementsOnPage) counterItems = 0
        if(counterItems === 0) pagesArray.push([])
        counterItems += array[i].length
        pagesArray[pagesArray.length - 1].push(arrayKeys[i])
    }
    let flatArray = pagesArray.flat()
    flatArray = flatArray.filter((el, index) => array[index].length > 0)
    pagesArray = pagesArray.map(el => el.filter(el => flatArray.includes(el)))
    console.log("------------")
    console.log(pagesArray)
    console.log(flatArray)
    console.log(array)
    console.log("------------")

    return (
        <div className="tlist newblock">
            <div className="tlist__header newblock">
                <Dropdown project={project} setProject={setProject} setPage={setPage} setGlobalRender={() => setIsRender(!isRender)}/>
            </div>
            <div className="tlist__list">
                {arrayKeys.length === 0 || pagesArray.length === 0 ? <p className="error">{isEn ? "Sorry, nothing here" : "Нажаль, тут нічого нема"}</p> : pagesArray[page].map((el, index) => {
                    console.log(el)
                    let allTime = array[flatArray.indexOf(el)].reduce((total, key) => total + +localStorage.getItem(key).split("^")[4],0);
                        return <TrackerBlock key={el+index} header={el.split(".").map(el => el.padStart(2, "0")).join(".")} all={allTime}>{
                            array[flatArray.indexOf(el)].map(key => {
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
