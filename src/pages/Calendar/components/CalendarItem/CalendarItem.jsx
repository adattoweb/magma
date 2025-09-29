import start from "@/assets/start.png"
import pause from "@/assets/pause2.png"
import drag from "@/assets/drag.png"

import updateTime from "./helpers/updateTime";
import useTimeRunning from "./hooks/useTimeRunning";

import React, { useState, useRef } from 'react'
import CalendarCircle from "./CalendarCircle/CalendarCircle";
import CalendarItemModal from "./CalendarItemModal";
import formatTime from "@/helpers/formatTime"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function CalendarItem({ elKey, dayDate, activeTaskId, isDragging, calendar, setCalendar, startDate }){
    const isAdaptive = window.innerWidth < 1024
    const index = elKey.split("@")[0].split("-")[2];

    const array = localStorage.getItem(elKey).split("^")

    const name = array[0]
    const desc = array[1]
    const [isActive, setIsActive] = useState(array[5] === "true");
    const time = useRef(+array[6])
    const indexPos = +array[7]
    const priority = +array[8]


    const [isStart, setIsStart] = useState(false)
    if(Number.isNaN(time.current)) time.current = 0;
    const [timeStr, setTimeStr] = useState(formatTime(time.current))

    function editItem(actualName, actualDesc, actualIsActive) {
        let oldArr = localStorage.getItem(elKey).split("^")
        localStorage.setItem(`calendar-item-${index}`, `${actualName}^${actualDesc}^${oldArr[2]}^${oldArr[3]}^${oldArr[4]}^${actualIsActive}^${time.current}^${indexPos}^${oldArr[8]}`);
    }

    useTimeRunning(isStart, time, setTimeStr, editItem, name, desc, isActive)


    const priorities = ["gray", "blue", "yellow", "red"] // назва класів з кольорами в порядку в якому вони будуть в модалці (розвернутими правда)

    const taskDate = `${array[2]}.${array[3]}.${array[4]}`

    const isOverdue = dayDate?.toLowerCase()?.includes("overdue") || dayDate?.toLowerCase()?.includes("просрочено") // ЦЕЙ ФРАГМЕНТ КОДУ НЕ МАСШТАБОВАНИЙ, ЯКЩО БУДЕМО ДОДАВАТИ ЩЕ МОВИ!!!

    const borderRadius = 10;

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: elKey})

    const style = {
        borderRadius: isOverdue && !isAdaptive ? `${borderRadius}px ${borderRadius}px ${borderRadius}px 0px` : `${borderRadius}px`,
        transition,
        transform: CSS.Transform.toString(transform),
    }


    const draggingClasses = `${activeTaskId === elKey && !isDragging ? "dragging-one" : activeTaskId === elKey && isDragging ? "dragging-two" : ""}`

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="calendaritem__provider" onClick={() => setIsOpen(true)} style={style} ref={setNodeRef}>
            <CalendarItemModal isOpen={isOpen} setIsOpen={setIsOpen} calendar={calendar} setCalendar={setCalendar} elKey={elKey} name={name} desc={desc} priority={priority} taskDate={taskDate} indexPos={indexPos} isOverdue={isOverdue} startDate={startDate}/>
            <div className= {`calendaritem ${priorities[priority]} ${draggingClasses} ${isOverdue ? "overdue-active" : ""}`}>
                <CalendarCircle setNewIsActive={setIsActive} newIsActive={isActive} editItem={editItem} newName={name} newDesc={desc} setIsStart={setIsStart} />
                <div className={`calendartext${desc.length === 0 ? " without-desc" : ""}`}>
                    <p className="calendartext__item">{name}</p>
                    <p className="calendartext__item calendartext__desc">{desc}</p>
                </div>
                <div className="calendartime">
                    <input onFocus={() => setIsStart(false)} type="text" value={timeStr} onClick={(e) => e.stopPropagation()} onChange={(e) => updateTime(e, time, setTimeStr, editItem, name, desc, isActive)}/>
                    <img src={isStart ? pause : start} alt="start" draggable={false} onClick={(e) => {setIsStart(!isStart); e.stopPropagation()}} />
                </div>
                <div className="calendar__images">
                    <img src={drag} onClick={(e) => e.stopPropagation()} className="calendaritem__img" alt="drag image" draggable={false} {...listeners} {...attributes}/>
                </div>
            </div>
            {isOverdue && !isAdaptive && <div className="expired__date"><p>{taskDate}</p></div>}
        </div>
    );
}