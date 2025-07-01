import next from "@/assets/next.png"

import addItem from "../../helpers/addItem"

import useDate from "./hooks/useDate";

import { useState } from "react";
import CalendarItem from "../CalendarItem/CalendarItem";

import { useDrop } from "react-dnd";

export default function CalendarDay({ date, arrayKeys, onChange, activeId, setActiveId, index, activeMenu, setIsActiveMenu}) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const [keyArr, setKeyArr] = useState(arrayKeys)

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");


    let [header, newDate] = useDate(isEn, date)

    function CalendarAdd() {
        let isActive = activeId === index
        return (
            <div className="calendaradd">
                <p onClick={() => {
                    if (!isActive) setActiveId(index)
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
                        }} />
                    </div>
                </div>}
            </div>
        )
    }

    const [hoverId, setHoverId] = useState(null)

    function moveTask(key){
        if(!hoverId) throw new Error("hoverid")
        const updated = keyArr.filter(el => el !== key)
        updated.splice(hoverId, 0, key)
        setKeyArr(updated)
    }

    function onDrop(item){
        const itemArray = localStorage.getItem(item.key).split("^");
        const itemDate = `${itemArray[2]}.${itemArray[3]}.${itemArray[4]}`
        const dateArray = date.split(".")
        localStorage.setItem(item.key, `${itemArray[0]}^${itemArray[1]}^${dateArray[0]}^${dateArray[1]}^${dateArray[2]}^${itemArray[5]}^${itemArray[6]}^${hoverId}^${itemArray[8]}`)
        console.log(itemDate, date)
        if(itemDate !== date){
            setKeyArr([...keyArr, item.key]);
            item.deleteOldElement()
        }
        moveTask(item.key)
    }

    const [, dropRef] = useDrop({
        accept: "task",
        drop: (item) => onDrop(item),
    });

    console.log(keyArr)

    return (
    <div className="calendarday" ref={dropRef}>
        <h4 className={`calendarday__header${keyArr.length > 0 ? " active" : ""}`}>{newDate}{newDate ? "," : ""} {header}</h4>
        <div className="calendarlist">
            {keyArr.map(el => el === "DRAGITEM" ? <div key={el} className="dragitem"></div> : <CalendarItem key={el} elKey={el} onChange={onChange} keyArr={keyArr} dayDate={header} activeMenu={activeMenu} setIsActiveMenu={setIsActiveMenu} setKeyArr={setKeyArr} moveTask={moveTask} setHoverId={setHoverId}/>)}
        </div>
        {header?.toLowerCase() !== "overdue" && <CalendarAdd/>}
    </div>
);
}
// змінні які ми юзаємо щоб передати дочірнім елементам:
// setPos, setIsTop, activeMenu, setActiveMenu тобто це все передається просто в CalendarItem, в самому RenderCalendarItem ніде не використовується