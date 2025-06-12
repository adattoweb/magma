import CalendarItem from "./CalendarItem";

import { createPortal } from "react-dom";
import { useState, useEffect, useCallback } from "react"

export default function RenderCalendarItem({ elKey, setDraggedKey, pos, setPos, selectedDay, onChange }) {
    const [isDisplay, setIsDisplay] = useState(true);
    const [isDragging, setIsDragging] = useState(false)
    const [itemPos, setItemPos] = useState({ x: 0, y: 0 }) // це позиція елементу
    const [size, setSize] = useState({ w: 0, y: 0 })

    function updatePos() {
        setItemPos({
            x: pos.x - size.w / 2,
            y: pos.y - size.h / 2,
        })
    }
    const dragEnd = useCallback(() => {
        console.log(selectedDay, isDragging)
        if (selectedDay && isDragging){
            const array = localStorage.getItem(elKey).split("^")
            array[2] = selectedDay[0]
            array[3] = selectedDay[1]
            array[4] = selectedDay[2]
            localStorage.setItem(elKey, array.join("^"))
            onChange()
        }
        setItemPos({ x: 0, y: 0 })
        setIsDragging(false)
    }, [selectedDay, isDragging])

    function dragStart() {
        setDraggedKey(elKey)
        setIsDragging(true)
        setItemPos({ x: pos.x - size.w / 2, y: pos.y - size.h / 2 })
    }

    useEffect(() => {
        window.addEventListener("mouseup", dragEnd);
        return () => window.removeEventListener("mouseup", dragEnd);
    }, [dragEnd]);

    useEffect(() => {
        if (isDragging) updatePos()
    }, [pos])

    useEffect(() => {
        if (isDragging) document.body.style.cursor = "grabbing"
        else document.body.style.cursor = ""
    }, [isDragging]);

    if (!isDisplay) return null;
    if (isDragging) return createPortal(<CalendarItem elKey={elKey} isDisplay={isDisplay} setIsDisplay={setIsDisplay} isDragging={isDragging} itemPos={itemPos} setSize={setSize} dragStart={dragStart}/>, document.getElementById("root"))
    else return <CalendarItem elKey={elKey} isDisplay={isDisplay} setIsDisplay={setIsDisplay} isDragging={isDragging} itemPos={itemPos} setPos={setPos} setSize={setSize} dragStart={dragStart}/>
}