import deleteImg from "../../../assets/delete.png";
import start from "../../../assets/start.png"
import pause from "../../../assets/pause2.png"
import drag from "../../../assets/drag.png"

import { useState, useEffect, useRef } from 'react'
import CalendarCircle from "./CalendarCircle";
import formatTime from "../../../helpers/formatTime"


export default function CalendarItem({ elKey, isDisplay, setIsDisplay, isDragging, itemPos, setSize, dragStart}) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    let array = ["Name", "Desc", "1991", "08", "24", "false", "0"]
    const index = elKey.split("@")[0].split("-")[2];

    if(isDisplay){
        array = localStorage.getItem(elKey).split("^")
    }

    const [name, setName] = useState(array[0]);
    const [desc, setDesc] = useState(array[1]);
    const [isActive, setIsActive] = useState(array[5] === "true");

    const [isStart, setIsStart] = useState(false)
    const time = useRef(+array[6])
    if(Number.isNaN(time.current)) time.current = 0;
    // console.log(time.current)
    const [timeStr, setTimeStr] = useState(formatTime(time.current))
    const timeRef = useRef(null)

    useEffect(() => {
        let timer;
        if (isStart) {
            timer = setInterval(() => {
                time.current += 1;
                setTimeStr(formatTime(time.current))
                editItem(name, desc, isActive)
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isStart]);

    function editItem(actualName, actualDesc, actualIsActive) {
        let oldArr = localStorage.getItem(elKey).split("^")
        localStorage.setItem(`calendar-item-${index}`, `${actualName}^${actualDesc}^${oldArr[2]}^${oldArr[3]}^${oldArr[4]}^${actualIsActive}^${time.current}`);
    }
    function deleteItem() {
        localStorage.removeItem(`calendar-item-${index}`);
        setIsDisplay(false);
    }

    const itemRef = useRef(null)

    useEffect(() => {
        setSize({w: itemRef.current.offsetWidth, h: itemRef.current.offsetHeight})
    }, [])


    return (
        <div className={!isDragging ? "calendaritem" : "calendaritem dragging"} style={{left: Number.isNaN(itemPos.x) ? 0 : itemPos.x, top: Number.isNaN(itemPos.y) ? 0 : itemPos.y}} ref={itemRef}>
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
                <input onFocus={() => setIsStart(false)} ref={timeRef} type="text" value={timeStr} onChange={(e) => {
                    let value = e.target.value
                    if (value.length > 8) return
                    let arr = value.split(":")

                    for (let i = 0; i < 3; i++) {
                        if (!arr[i]) arr[i] = 0;
                    }

                    for (let i = 0; i < arr.length; i++) {
                        if (Number.isNaN(arr[i])) arr[i] = 0
                    }

                    time.current = +arr[0] * 60 * 60 + +arr[1] * 60 + +arr[2]
                    setTimeStr(value)
                    editItem(name, desc, isActive)
                }} />
                <img src={isStart ? pause : start} alt="start" draggable={false} onClick={() => {
                    if (!isActive) setIsStart(!isStart)
                }} />
            </div>
            <div className="calendar__images">
                <img src={deleteImg} className="calendaritem__img" onClick={deleteItem} draggable={false} />
                <img src={drag} className="calendaritem__img" alt="drag image" onMouseDown={dragStart} draggable={false}/>
            </div>
        </div>
    );
}