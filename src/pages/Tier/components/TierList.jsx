import { useState} from "react";
import TierItem from "./TierItem"

export default function TierList() {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначаємо мову

    const localList = () => localStorage.getItem("tier-list") ?? "" 
    if (localStorage.getItem("tier-list") !== null) {
        localStorage.setItem("tier-list", localStorage.getItem("tier-list").replace(/\^{2,}/g, ""));
    }
    const [isRender, setIsRender] = useState(false); // чисто щоб рендерити наново увесь компонент
    
    let array = localList().split("^").map(el => el.split("@"));
    return (
        <div className="tlist newblock">
            <div className="tlist__header newblock">
                {isEn ? "Tier List of Tasks" : "Тірліст задач"}
            </div>
            <div className="tlist__list">
                {localList().length === 0 ? 
                    <p className="tier__error">{isEn ? "Sorry, there is nothing here!" : "Нажаль тут нічого немає!"}</p> 
                    : array.map((el, index) => {
                        return <TierItem key={el + index} startName={el[0]} index={index + 1} localIndex={el[1]} setIsRender={setIsRender} isRender={isRender} localList={localList}/>;
                    })}
            </div>
        </div>
    );
}
