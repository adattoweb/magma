import { useState } from "react";

import next from "@/assets/next.png"

import addItem from "../../helpers/addItem"

import useDate from "./hooks/useDate";

import CalendarItem from "../CalendarItem/CalendarItem";

import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from '@dnd-kit/core';

export default function CalendarDay({ date, keyArr, activeId, setActiveId, index, activeMenu, setActiveMenu, activeTaskId, calendar, setCalendar }) {
    if(keyArr.length === 0 && date.toLowerCase() === "overdue") return
    const isEn = localStorage.getItem("settings-lang") === "en";

    let [header, newDate] = useDate(isEn, date)

    function CalendarAdd() {
        const [name, setName] = useState("");
        const [desc, setDesc] = useState("");
        let isActive = activeId === index
        function switchAdd(){
            if (!isActive) setActiveId(index)
            else setActiveId(null)
        }
        return (
            <div className="calendaradd">
                <p onClick={switchAdd}>+ {isEn ? "Add Task" : "Додати задачу"}</p>
                {isActive && <div className="calendarform">
                    <div className="calendarform__inputs">
                        <input type="text" className="calendarform__name calendarforminput" placeholder={isEn ? "Task Name" : "Назва задачі"} value={name} onChange={(e) => setName(e.target.value)} />
                        <textarea name="description" id="description" className="calendarform__description calendarforminput" placeholder={isEn ? "Task Description" : "Опис задачі"} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="calendar__footer">
                        <img src={next} alt="add" className="calendarform__button" draggable={false} onClick={() => {
                            addItem(name, desc, date, setName, setDesc, keyArr.length, calendar, setCalendar);
                        }} />
                    </div>
                </div>}
            </div>
        )
    }

    const {setNodeRef} = useDroppable({id: date, data: {isDay: true}});
    return (
    <div className="calendarday" ref={setNodeRef}>
        <h4 className={`calendarday__header${keyArr.length > 0 ? " active" : ""}`}>{newDate}{newDate ? "," : ""} {header}</h4>
        <div className="calendarlist">
            <SortableContext items={keyArr} strategy={verticalListSortingStrategy}>
                {keyArr.map(el => <CalendarItem key={el} elKey={el} keyArr={keyArr} dayDate={header} activeMenu={activeMenu} setActiveMenu={setActiveMenu} activeTaskId={activeTaskId} calendar={calendar} setCalendar={setCalendar}/>)}
            </SortableContext>
        </div>
        {(date.toLowerCase() !== "overdue" ) && <CalendarAdd/> }
    </div>
);
}