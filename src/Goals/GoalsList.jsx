import "./Goals.css";
import { useState} from "react";
import deleteImg from "../assets/delete.png";
import arrow from "../assets/arrow.png";

export default function TrackerList() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const localList = () => localStorage.getItem("goals-list") ?? "" 

    if (localStorage.getItem("goals-list") !== null) {
        localStorage.setItem("goals-list", localStorage.getItem("goals-list").replace(/\^{2,}/g, ""));
    }
    const [isRender, setIsRender] = useState(false);
    function TrackerItem({ startName, index, localIndex, startMin, startMax }) {
        const [name, setName] = useState(startName);
        const [min, setMin] = useState(startMin);
        const [max, setMax] = useState(startMax);

        if (index !== localIndex) {
            localStorage.setItem("goals-list", localList().replace(`${name}@${localIndex}@${min}@${max}`, `${name}@${index}@${min}@${max}`));
        }

        function editProperty(actualValue, propIndex) {
            if ((propIndex === 2 && actualValue < 0) || (propIndex === 3 && actualValue <= 0)) return
            // if (propIndex === 2 && +actualValue > +max) return;
            // if (propIndex === 3 && +actualValue < +min) return;

            let tierArr = localList().split("^").map(el => el.split("@"));
            for (let i = 0; i < tierArr.length; i++) {
                if (tierArr[i][0] === name && +tierArr[i][1] === index) {
                    tierArr[i][propIndex] = actualValue;
                    break;
                }
            }
            tierArr = tierArr.map(el => el.join("@")).join("^");
            localStorage.setItem("goals-list", tierArr);
        }

        function editPosition(newIndex) {
            let tierArr = localList().split("^").map(el => el.split("@"));
            if (newIndex - 1 >= tierArr.length || newIndex === 0) return;
            let temp = tierArr[newIndex - 1];
            tierArr[newIndex - 1] = tierArr[index - 1];
            tierArr[index - 1] = temp;
            tierArr[newIndex - 1][1] = newIndex;
            tierArr[index - 1][1] = index;
            tierArr = tierArr.map(el => el.join("@")).join("^");
            localStorage.setItem("goals-list", tierArr);
            setIsRender(!isRender);
        }

        function deleteItem() {
            let tierArr = localList().split("^");
            tierArr.splice(index - 1, 1);
            tierArr = tierArr.join("^");
            localStorage.setItem("goals-list", tierArr);
            setIsRender(!isRender);
        }

        return (
            <div className="titem tierlist goalslist">
                <div className="titem__edit">
                    <div className="titem__circle">{+index}</div>
                    <input type="text" value={name} onChange={(e) => {
                        setName(e.target.value);
                        editProperty(e.target.value, 0);
                    }} />
                    <div className="goals__input">
                        <input type="number" value={min} onChange={(e) => {
                            setMin(e.target.value);
                            editProperty(e.target.value, 2);
                        }} />
                        <p>/</p>
                        <input type="number" value={max} onChange={(e) => {
                            setMax(e.target.value);
                            editProperty(e.target.value, 3);
                        }} />
                    </div>
                </div>
                <div className="titem__info">
                    <div className="titem__time">
                        <img src={arrow} onClick={() => editPosition(index + 1)} alt={isEn ? "Move up" : "Перемістити вгору"} />
                        <img src={arrow} onClick={() => editPosition(index - 1)} alt={isEn ? "Move down" : "Перемістити вниз"} />
                    </div>
                    <div className="titem__delete">
                        <img src={deleteImg} onClick={deleteItem} alt={isEn ? "Delete" : "Видалити"} />
                    </div>
                </div>
            </div>
        );
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
                        <TrackerItem key={el + index} startName={el[0]} index={index + 1} localIndex={el[1]} startMin={el[2]} startMax={el[3]} />
                    ))}
            </div>
        </div>
    );
}
