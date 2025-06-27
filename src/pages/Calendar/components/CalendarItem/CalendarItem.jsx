import more from "@/assets/more.png"
import start from "@/assets/start.png"
import pause from "@/assets/pause2.png"
import drag from "@/assets/drag.png"

import useChangePos from "./hooks/useChangePos";
import useTime from "./hooks/useTime";
import useBack from "./hooks/useBack";
import useTimeRunning from "./hooks/useTimeRunning";
import useArray from "./hooks/useArray";

import { createPortal } from "react-dom";
import React, { useState, useEffect, useRef } from 'react'
import CalendarCircle from "../CalendarCircle/CalendarCircle";
import ModalMenu from "./ModalMenu";
import formatTime from "@/helpers/formatTime"

export default function CalendarItem({ elKey, isDisplay, setIsDisplay, isDragging, itemPos, setSize, dragStart, indexRef, pos, setIsTop, activeMenu, setActiveMenu, onChange, keyArr, dayDate }){
    const isEn = localStorage.getItem("settings-lang") === "en";
    const index = elKey.split("@")[0].split("-")[2];

    const array = useArray(isDisplay, elKey)


    const [name, setName] = useState(array[0]);
    const [desc, setDesc] = useState(array[1]);
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

    const itemRef = useRef(null)

    useEffect(() => {
        setSize({w: itemRef.current.offsetWidth, h: itemRef.current.offsetHeight})
    }, [])

    const rectItem = useRef(null)
    useBack(itemRef, rectItem, indexRef, indexPos, setIsTop, pos)

    function changeModal(){
        setActiveMenu(activeMenu === index ? null : index)
    }

    const menuBtn = useRef(null)
    const menuBtnRect = useRef()

    useEffect(() => {
        menuBtnRect.current = menuBtn.current.getBoundingClientRect()
    }, [itemPos])

    const priorities = ["gray", "blue", "yellow", "red"] // назва класів з кольорами в порядку в якому вони будуть в модалці (розвернутими правда)

    const taskDate = `${array[2]}.${array[3]}.${array[4]}`

    const isExpired = dayDate?.includes("expired")

    return (
        <div className="calendaritem__provider">
            {(activeMenu === index) && createPortal(<ModalMenu elKey={elKey} setIsDisplay={setIsDisplay} index={index} rect={menuBtnRect.current} priorities={priorities.current} onChange={onChange} keyArr={keyArr}/>, document.getElementById("root"))}
            <div className= {`calendaritem ${isDragging && "dragging"} ${priorities[priority]}`} style={{left: Number.isNaN(itemPos.x) ? 0 : itemPos.x, top: Number.isNaN(itemPos.y) ? 0 : itemPos.y, borderRadius: isExpired ? "10px 10px 10px 0px" : "10px" }} ref={itemRef} onMouseEnter={() => useChangePos(isDragging, indexRef, indexPos)}>
                <CalendarCircle setNewIsActive={setIsActive} newIsActive={isActive} editItem={editItem} newName={name} newDesc={desc} setIsStart={setIsStart} />
                <div className="calendaritem__text">
                    <input type="text" value={name} placeholder={isEn ? "Task Name" : "Назва задачі"} onChange={(e) => {
                        setName(e.target.value);
                        editItem(e.target.value, desc, isActive);
                    }} />
                    <input className="calendartext__desc" type="text" placeholder={isEn ? "Task Description" : "Опис задачі"} value={desc} onChange={(e) => {
                        setDesc(e.target.value);
                        editItem(name, e.target.value, isActive);
                    }} />
                </div>
                <div className="calendartime">
                    <input onFocus={() => setIsStart(false)} type="text" value={timeStr} onChange={(e) => useTime(e, time, setTimeStr, editItem, name, desc, isActive)}/>
                    <img src={isStart ? pause : start} alt="start" draggable={false} onClick={() => {if (!isActive) setIsStart(!isStart)}} />
                </div>
                <div className="calendar__images">
                    <img src={more} className="calendaritem__img" onClick={changeModal} draggable={false} ref={menuBtn}/>
                    <img src={drag} className="calendaritem__img" alt="drag image" onMouseDown={dragStart} draggable={false}/>
                </div>
            </div>
            {isExpired && <div className="expired__date"><p>{taskDate}</p></div>}
        </div>
    );
}