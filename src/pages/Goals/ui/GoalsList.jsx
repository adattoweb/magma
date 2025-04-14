import GoalsItem from "./GoalsItem";
import { useState} from "react";

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

    return (
        <div className="tlist">
            <div className="tlist__header">
                {isEn ? "Goals" : "Цілі"} {allMin || 0}/{allMax || 0}
            </div>
            <div className="tlist__list">
                {localList().length === 0 ? 
                    <p className="tier__error">{isEn ? "Unfortunately, there is nothing here!" : "Нажаль тут нічого немає!"}</p> 
                    : array.map((el, index) => (
                        <GoalsItem key={el[0] + index} startName={el[0]} index={index + 1} localIndex={el[1]} startMin={el[2]} startMax={el[3]} isRender={isRender} setIsRender={setIsRender}/>
                    ))}
            </div>
        </div>
    );
}
