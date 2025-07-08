import more from "@/assets/more.png"
import start from "@/assets/start.png"
import pause from "@/assets/pause2.png"
import drag from "@/assets/drag.png"

import updateTime from "./helpers/updateTime";
import useTimeRunning from "./hooks/useTimeRunning";

import { createPortal } from "react-dom";
import React, { useState, useEffect, useRef } from 'react'
import CalendarCircle from "../CalendarCircle/CalendarCircle";
import ModalMenu from "./ModalMenu";
import formatTime from "@/helpers/formatTime"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function CalendarItem({ elKey, dayDate, activeMenu, setActiveMenu, keyArr, activeTaskId, isDragging, calendar, setCalendar }){
    const isEn = localStorage.getItem("settings-lang") === "en";
    const index = elKey.split("@")[0].split("-")[2];

    const array = localStorage.getItem(elKey).split("^")

    const [name, setName] = useState(array[0]);
    const [desc, setDesc] = useState(array[1]);
    const [isActive, setIsActive] = useState(array[5] === "true");
    const time = useRef(+array[6])
    const indexPos = +array[7]
    const priority = +array[8]

    const [isRender, setIsRender] = useState(false)

    const [isStart, setIsStart] = useState(false)
    if(Number.isNaN(time.current)) time.current = 0;
    const [timeStr, setTimeStr] = useState(formatTime(time.current))

    function editItem(actualName, actualDesc, actualIsActive) {
        let oldArr = localStorage.getItem(elKey).split("^")
        localStorage.setItem(`calendar-item-${index}`, `${actualName}^${actualDesc}^${oldArr[2]}^${oldArr[3]}^${oldArr[4]}^${actualIsActive}^${time.current}^${indexPos}^${oldArr[8]}`);
    }

    useTimeRunning(isStart, time, setTimeStr, editItem, name, desc, isActive)


    const menuBtn = useRef(null)
    const menuBtnRect = useRef()

    useEffect(() => {
        menuBtnRect.current = menuBtn.current.getBoundingClientRect()
    }, [activeMenu])

    const priorities = ["gray", "blue", "yellow", "red"] // назва класів з кольорами в порядку в якому вони будуть в модалці (розвернутими правда)

    const taskDate = `${array[2]}.${array[3]}.${array[4]}`

    const isOverdue = dayDate?.toLowerCase()?.includes("overdue") || dayDate?.toLowerCase()?.includes("просрочено") // ЦЕЙ ФРАГМЕНТ КОДУ НЕ МАСШТАБОВАНИЙ, ЯКЩО БУДЕМО ДОДАВАТИ ЩЕ МОВИ!!!

    const borderRadius = 10;

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: elKey})

    const style = {
        borderRadius: isOverdue ? `${borderRadius}px ${borderRadius}px ${borderRadius}px 0px` : `${borderRadius}px`,
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const isActiveMenu = activeMenu === index

    function switchMenu(){
        setActiveMenu(!isActiveMenu ? index : null)
    }

    const draggingClasses = `${activeTaskId === elKey && !isDragging ? "dragging-one" : activeTaskId === elKey && isDragging ? "dragging-two" : ""}`

    return (
        <div className="calendaritem__provider">
            {isActiveMenu && createPortal(<ModalMenu onChange={() => setIsRender(!isRender)} elKey={elKey} rect={menuBtn.current} priorities={priorities.current} keyArr={keyArr} calendar={calendar} setCalendar={setCalendar} setActiveMenu={setActiveMenu} menuBtnRef={menuBtn}/>, document.getElementById("root"))}
            <div className= {`calendaritem ${priorities[priority]} ${draggingClasses}`} style={style} ref={setNodeRef}>
                <CalendarCircle setNewIsActive={setIsActive} newIsActive={isActive} editItem={editItem} newName={name} newDesc={desc} setIsStart={setIsStart} />
                <div className="calendaritem__text">
                    <input type="text" value={name} placeholder={isEn ? "Task Name" : "Назва задачі"} onChange={(e) => {
                        setName(e.target.value.replaceAll("^", "."));
                        editItem(e.target.value.replaceAll("^", "."), desc, isActive);
                    }} />
                    <input className="calendartext__desc" type="text" placeholder={isEn ? "Task Description" : "Опис задачі"} value={desc} onChange={(e) => {
                        setDesc(e.target.value);
                        editItem(name, e.target.value, isActive);
                    }} />
                </div>
                <div className="calendartime">
                    <input onFocus={() => setIsStart(false)} type="text" value={timeStr} onChange={(e) => updateTime(e, time, setTimeStr, editItem, name, desc, isActive)}/>
                    <img src={isStart ? pause : start} alt="start" draggable={false} onClick={() => {setIsStart(!isStart)}} />
                </div>
                <div className="calendar__images">
                    <img src={more} className="calendaritem__img" draggable={false} ref={menuBtn} onClick={switchMenu}/>
                    <img src={drag} className="calendaritem__img" alt="drag image" draggable={false} {...listeners} {...attributes}/>
                </div>
            </div>
            {isOverdue && <div className="expired__date"><p>{taskDate}</p></div>}
        </div>
    );
}
//