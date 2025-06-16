import next from "../../../assets/next.png"

import addItem from "../helpers/addItem"

import useDay from "../hooks/CalendarDay/useDay";
import useUpdate from "../hooks/CalendarDay/useUpdate";
import useDate from "../hooks/CalendarDay/useDate";

import RenderCalendarItem from "./RenderCalendarItem";
import { useState, useRef } from "react";

export default function CalendarDay({ date, keyArr, onChange, activeId, setActiveId, index, draggedKey, setDraggedKey, pos, setPos, selectedDate, setSelectedDate, draggingCount, setDraggingCount, indexRef, selectedKeys, setSelectedKeys, isTop, setIsTop }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [newKeyArr, setNewKeyArr] = useState(keyArr)

    let [header, newDate] = useDate(isEn, date)
    let isActive = activeId === index

    const dayRef = useRef(null)

    useUpdate(draggingCount, selectedDate, date, indexRef, isTop, keyArr, setNewKeyArr)

    return (
    <div className="calendarday" onMouseEnter={() => useDay(draggedKey, date, setSelectedDate, setSelectedKeys, keyArr, indexRef)} ref={dayRef}>
        <h4 className="calendarday__header">{newDate}{newDate ? "," : ""} {header}</h4>
        <div className="calendarlist">
            {newKeyArr.map(el => el === "DRAGITEM" ? <div key={el} className="dragitem"></div> : <RenderCalendarItem key={el} elKey={el} draggedKey={draggedKey} setDraggedKey={setDraggedKey} pos={pos} setPos={setPos} selectedDate={selectedDate} onChange={onChange} 
                draggingCount={draggingCount} setDraggingCount={setDraggingCount} keyArr={keyArr} date={date} 
                indexRef={indexRef} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} clearNewKeyArr={() => setNewKeyArr(newKeyArr.filter(el => el !== "DRAGITEM"))} setIsTop={setIsTop}/>)}
            {/* {(draggingCount > 0 && selectedDate?.join(".") === date && !newKeyArr.includes("DRAGITEM")) && <DragItem top={indexRef.current * 113}/>} */}
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