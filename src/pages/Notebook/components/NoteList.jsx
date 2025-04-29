import {useState} from "react";
import NoteBlock from "./NoteBlock";

export default function NotetList() {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови
    const [isRender, setIsRender] = useState(false);

    let noteKeys = []
    const localKeys = Object.keys(localStorage)

    for(let i = 0; i < localKeys.length; i++){
        if(localKeys[i].includes("note-item")){
            noteKeys.push(localKeys[i])
        }
    }

    const [page, setPage] = useState(0)
    const elementsOnPage = 15
    let pagesArray = []
    for(let i = 0; i < noteKeys.length / elementsOnPage; i++){
        pagesArray.push(i)
    }
    let counterItems = 0;

    function PagesButton({num, page, onClick}){
        return <div className={page === num ? "tpages__button newblock choosed" : "tpages__button newblock"} onClick={onClick}>{num}</div>
    }

    return (
        <div className="tlist newblock">
            <div className="tlist__header newblock">
                {isEn ? "All notes" : "Всі нотатки"}
            </div>
            <div className="tlist__list">
                {noteKeys.length === 0 ? <p className="error">{isEn ? "Sorry, nothing here" : "Нажаль, тут нічого нема"}</p> : noteKeys.map((el, index) => {
                    counterItems++;
                    if(counterItems-1 >= elementsOnPage * (page+1) - elementsOnPage && counterItems-1 < elementsOnPage * (page+1)){
                        return <NoteBlock key={el+index} localKey={el} isRender={isRender} setIsRender={setIsRender}/>
                    }
                })}
            </div>
            {
                pagesArray.length > 1 && <div className="tpages">
                    {pagesArray.map((el, index) => {
                        return <PagesButton key={index + el} page={page} num={index} onClick={() => setPage(index)} />
                    })}
                </div>
            }
        </div>
    );
}