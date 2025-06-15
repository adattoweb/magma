import next from "../../../assets/next.png"

import addItem from "../helpers/addItem"
import displayHeader from "../helpers/displayHeader";
import RenderCalendarItem from "./RenderCalendarItem";
import { useState, useRef, useEffect } from "react";

export default function CalendarDay({ date, keyArr, onChange, activeId, setActiveId, index, draggedKey, setDraggedKey, pos, setPos, selectedDate, setSelectedDate, draggingCount, setDraggingCount, indexRef, selectedKeys, setSelectedKeys, isTop, setIsTop }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [newKeyArr, setNewKeyArr] = useState(keyArr)

    let [header, newDate] = [`${isEn ? "Expired" : "Просрочено"}`, ""]
    if(date !== "expired") {
        let [headerGived, newDateGived] = displayHeader(date)
        header = headerGived;
        newDate = newDateGived;
    }
    let isActive = activeId === index

    const dayRef = useRef(null)

    function setDay(){
        if(draggedKey) {
            if(date !== "expired") {
                setSelectedDate(date.split("."))
                setSelectedKeys(keyArr)
                if(keyArr.length === 0) indexRef.current = 0;
            }
            else return false
        }
    }

    function DragItem(){
        return (
            <div className="dragitem">
            </div>
        )
    }

    function updateNewKeyArr(){
        if(draggingCount > 0 && selectedDate?.join(".") === date){
            const newArr = keyArr.filter(el => el !== "DRAGITEM")
            newArr.splice(isTop ? indexRef.current : indexRef.current+1, 0, "DRAGITEM")
            setNewKeyArr(newArr)
        }
    }

    useEffect(() => {
        updateNewKeyArr()
    }, [indexRef.current])

    useEffect(() => {
        setNewKeyArr(keyArr)
        updateNewKeyArr()
    }, [keyArr])

    return (
    <div className="calendarday" onMouseEnter={setDay} ref={dayRef}>
        <h4 className="calendarday__header">{newDate}{newDate ? "," : ""} {header}</h4>
        <div className="calendarlist">
            {newKeyArr.map(el => el === "DRAGITEM" ? <DragItem key={el}/> : <RenderCalendarItem key={el} elKey={el} draggedKey={draggedKey} setDraggedKey={setDraggedKey} pos={pos} setPos={setPos} selectedDate={selectedDate} onChange={onChange} 
                draggingCount={draggingCount} setDraggingCount={setDraggingCount} keyArr={keyArr} date={date} 
                indexRef={indexRef} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} clearNewKeyArr={() => setNewKeyArr(newKeyArr.filter(el => el !== "DRAGITEM"))} setIsTop={setIsTop}/>)}
            {(draggingCount > 0 && selectedDate?.join(".") === date && !newKeyArr.includes("DRAGITEM")) && <DragItem top={indexRef.current * 113}/>}
        </div>
        <div className="calendaradd">
            <p onClick={() => {
                if(!isActive) setActiveId(index)
                else setActiveId(null)
            }}>+ {isEn ? "Add Task" : "Додати задачу"}</p>
            {isActive && <div className="calendarform">
                <div className="calendarform__inputs">
                    <input type="text" className="calendarform__name calendarforminput" placeholder={isEn ? "Task Name" : "Назва задачі"} value={name} onChange={(e) => setName(e.target.value)} />
                    <textarea name="description" id="description" className="calendarform__description calendarforminput" placeholder={isEn ? "Task Description" : "Опис задачі"} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <div className="calendar__footer">
                    <img src={next} alt="add" className="calendarform__button" draggable={false} onClick={() => {
                        addItem(name, desc, date, setName, setDesc, keyArr.length);
                        onChange();
                    }}/>
                </div>
            </div>}
        </div>
    </div>
);

}