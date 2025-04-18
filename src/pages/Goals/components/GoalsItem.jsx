import { useState} from "react";
import editPosition from "../helpers/editPosition";
import deleteItem from "../helpers/deleteItem";
import editProperty from "../helpers/editProperty"
import deleteImg from "../../../assets/delete.png";
import arrow from "../../../assets/arrow.png";


export default function GoalsItem({ startName, index, localIndex, startMin, startMax, isRender, setIsRender}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState(startName);
    const [min, setMin] = useState(startMin);
    const [max, setMax] = useState(startMax)
    const localList = () => localStorage.getItem("goals-list") ?? "" 

    if (index !== localIndex) {
        localStorage.setItem("goals-list", localList().replace(`${name}@${localIndex}@${min}@${max}`, `${name}@${index}@${min}@${max}`));
    }

    return (
        <div className="titem tierlist goalslist">
            <div className="titem__edit">
                <div className="titem__circle">{+index}</div>
                <input type="text" value={name} onChange={(e) => {
                    setName(e.target.value);
                    editProperty(e.target.value, 0, localList, index, name);
                }} />
                <div className="goals__input">
                    <input type="number" value={min} onChange={(e) => {
                        setMin(e.target.value);
                        editProperty(e.target.value, 2, localList, index, name);
                    }} />
                    <p>/</p>
                    <input type="number" value={max} onChange={(e) => {
                        setMax(e.target.value);
                        editProperty(e.target.value, 3, localList, index, name);
                    }} />
                </div>
            </div>
            <div className="titem__info">
                <div className="titem__time">
                    <img src={arrow} onClick={() => editPosition(index + 1, index, localList, setIsRender, isRender)} alt={isEn ? "Move up" : "Перемістити вгору"} />
                    <img src={arrow} onClick={() => editPosition(index - 1, index, localList, setIsRender, isRender)} alt={isEn ? "Move down" : "Перемістити вниз"} />
                </div>
                <div className="titem__delete">
                    <img src={deleteImg} onClick={() => deleteItem(index, localList, isRender, setIsRender)} alt={isEn ? "Delete" : "Видалити"} />
                </div>
            </div>
        </div>
    );
}