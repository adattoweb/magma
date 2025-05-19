import GoalsItem from "./GoalsItem";
import { useState } from "react";

export default function GoalsList() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const localList = () => localStorage.getItem("goals-list") ?? "" 
    const [isRender, setIsRender] = useState(false);

    if (localStorage.getItem("goals-list") !== null) {
        localStorage.setItem("goals-list", localStorage.getItem("goals-list").replace(/\^{2,}/g, ""));
    }

    let array = localList().split("^").map(el => el.split("@"));
    let allMin = 0;
    let allMax = 0;

    for (let i = 0; i < array.length; i++) {
        allMin += +array[i][2];
        allMax += +array[i][3];
    }

    const [page, setPage] = useState(0)
    const elementsOnPage = 15
    let pagesArray = []
    for(let i = 0; i < array.length / elementsOnPage; i++){
        pagesArray.push(i)
    }

    function PagesButton({num, page, onClick}){
        return <div className={page === num ? "tpages__button newblock choosed" : "tpages__button newblock"} onClick={onClick}>{num}</div>
    }

    return (
        <div className="glist tlist newblock">
            <div className="tlist__header newblock">
                {isEn ? "Goals" : "Цілі"} {allMin || 0}/{allMax || 0}
            </div>
            <div className="tlist__list">
                {localList().length === 0 ? 
                    <p className="tier__error">{isEn ? "Unfortunately, there is nothing here!" : "Нажаль тут нічого немає!"}</p> 
                    : array.map((el, index) => {
                        if(index >= elementsOnPage * (page+1) - elementsOnPage && index < elementsOnPage * (page+1)){
                            return <GoalsItem key={el[0] + index} startName={el[0]} index={index + 1} localIndex={el[1]} startMin={el[2]} startMax={el[3]} isRender={isRender} setIsRender={setIsRender}/>
                        }
                    }
                    )}
            </div>
            {pagesArray.length > 1 && <div className="tpages">
                {pagesArray.map((el, index) => {
                    return <PagesButton key={index + el} page={page} num={index} onClick={() => setPage(index)}/>
                })}
            </div>}
        </div>
    );
}
