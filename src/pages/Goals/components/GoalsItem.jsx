import { useState} from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import deleteItem from "../helpers/deleteItem";
import editProperty from "../helpers/editProperty"

import deleteImg from "@/assets/delete.png";
import drag from "@/assets/drag.png"


export default function GoalsItem({ index, array, setArray, active, isDraggable }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState(array[0]);
    const [min, setMin] = useState(array[2]);
    const [max, setMax] = useState(array[3])
    const localList = () => localStorage.getItem("goals-list") ?? "" 

    const uniqueIndex = array[1]
    console.log(uniqueIndex)

    let localIndex = array[0]

    if (index !== localIndex) {
        localStorage.setItem("goals-list", localList().replace(`${name}@${localIndex}@${min}@${max}`, `${name}@${index}@${min}@${max}`));
    }

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: uniqueIndex})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div className={`gitem ${isDraggable ? "newblock" : uniqueIndex === active ? "gitem-dragging" : ""}`} style={style} ref={setNodeRef}>
            <div className="gitem__edit">
                <div className="gitem__circle"><p>{+index}</p></div>
                <input className="gitem__name" type="text" value={name} onChange={(e) => {
                    setName(e.target.value);
                    editProperty(e.target.value, min, max, uniqueIndex, setArray);
                }} />
                <div className="goals__input">
                    <input type="number" value={min} onChange={(e) => {
                        setMin(e.target.value);
                        editProperty(name, e.target.value, max, uniqueIndex, setArray);
                    }} />
                    <hr className="gdevider"/>
                    <input type="number" value={max} onChange={(e) => {
                        setMax(e.target.value);
                        editProperty(name, min, e.target.value, uniqueIndex, setArray);
                    }} />
                </div>
            </div>
            <div className="titem__info">
                <div className="titem__delete">
                    <img draggable={false} src={deleteImg} onClick={() => deleteItem(index, localList, setArray)} alt={isEn ? "Delete" : "Видалити"} />
                </div>
                <div className="titem__time">
                    <img src={drag} alt="drag img" draggable={false} {...listeners} {...attributes}/>
                </div>
            </div>
        </div>
    );
}