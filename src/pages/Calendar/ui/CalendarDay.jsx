import next from "../../../assets/next.png"

import addItem from "../helpers/addItem"
import displayHeader from "../helpers/displayHeader";
import RenderCalendarItem from "./RenderCalendarItem";
import { useState } from "react";

export default function CalendarDay({ date, keyArr, onChange, activeId, setActiveId, index, draggedKey, setDraggedKey, pos, setPos, selectedDay, setSelectedDay }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    let [header, newDate] = [`${isEn ? "Expired" : "Просрочено"}`, ""]
    if(date !== "expired") {
        let [headerGived, newDateGived] = displayHeader(date)
        header = headerGived;
        newDate = newDateGived;
    }
    let isActive = activeId === index

    function setDay(){
        if(draggedKey) {
            setSelectedDay(date.split("."))
        }
    }

    return (
    <div className="calendarday" onMouseEnter={setDay}>
        <h4 className="calendarday__header">{newDate}{newDate ? "," : ""} {header}</h4>
        <div className="calendarlist">
            {keyArr.map(el => <RenderCalendarItem key={el} elKey={el} setDraggedKey={setDraggedKey} pos={pos} setPos={setPos} selectedDay={selectedDay} onChange={onChange}/>)}
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
                    <img src={next} alt="add" className="calendarform__button" onClick={() => {
                        addItem(name, desc, date, setName, setDesc);
                        onChange();
                    }}/>
                </div>
            </div>}
        </div>
    </div>
);

}