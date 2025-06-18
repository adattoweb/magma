import CalendarItem from "../CalendarItem/CalendarItem";

import useUpdateCursor from "./hooks/useUpdateCursor";
import useUpdateItemPos from "./hooks/useUpdateItemPos";
import useCleanEvent from "./hooks/useCleanEvent";

import { createPortal } from "react-dom";
import { useState, useCallback } from "react"

export default function RenderCalendarItem({ elKey, draggedKey, setDraggedKey, pos, setPos, selectedDate, onChange, draggingCount, setDraggingCount, keyArr, date, indexRef, selectedKeys, setSelectedKeys, clearNewKeyArr, setIsTop }) {
    const [isDisplay, setIsDisplay] = useState(true);
    const [isDragging, setIsDragging] = useState(false)
    const [itemPos, setItemPos] = useState({ x: 0, y: 0 }) // це позиція елементу
    const [size, setSize] = useState({ w: 0, y: 0 })

    const dragEnd = useCallback(() => {
        if(selectedDate && isDragging){
            const array = localStorage.getItem(elKey).split("^")
            array[2] = selectedDate[0]
            array[3] = selectedDate[1]
            array[4] = selectedDate[2]
            localStorage.setItem(elKey, array.join("^"))
            function updateIndex(arrayKeys){
                for(let i = 0; i < arrayKeys.length; i++){ // МОЖЛИВО БАГ ТУТ???
                    const newArray = localStorage.getItem(arrayKeys[i]).split("^")
                    newArray[7] = i
                    localStorage.setItem(arrayKeys[i], newArray.join("^"))
                }
            }
            if(date === selectedDate.join(".")){ // ЯКЩО ВНУТРІШНІ ПЕРЕНОСЕННЯ
                keyArr = keyArr.filter(el => +localStorage.getItem(el).split("^")[7] !== +localStorage.getItem(draggedKey).split("^")[7]) // УВАГА
                keyArr.splice(indexRef.current, 0, draggedKey)
                updateIndex(keyArr)
            } else { // ЯКЩО ПЕРЕНОСЕННЯ МІЖ ДНЯМИ
                keyArr = keyArr.filter(el => +localStorage.getItem(el).split("^")[7] !== +localStorage.getItem(draggedKey).split("^")[7]) // УВАГА
                updateIndex(keyArr)

                const newSelectedKeys = [...selectedKeys];
                newSelectedKeys.splice(indexRef.current, 0, draggedKey);
                console.log(newSelectedKeys)

                updateIndex(newSelectedKeys)
                setSelectedKeys(newSelectedKeys)
            }
            onChange()
            clearNewKeyArr()
        }
        setItemPos({ x: 0, y: 0 })
        setIsDragging(false)
    }, [selectedDate, isDragging])

    function dragStart() {
        setDraggedKey(elKey)
        setIsDragging(true)
        setItemPos({ x: pos.x - size.w / 2, y: pos.y - size.h / 2 })
    }

    useCleanEvent(dragEnd)

    useUpdateItemPos(isDragging, setItemPos, pos, size)

    useUpdateCursor(isDragging, draggingCount, setDraggingCount)

    if (!isDisplay) return null;
    if (isDragging) return createPortal(<CalendarItem elKey={elKey} isDisplay={isDisplay} setIsDisplay={setIsDisplay} isDragging={isDragging} itemPos={itemPos} setSize={setSize} dragStart={dragStart} indexRef={indexRef} pos={pos} setIsTop={setIsTop}/>, document.getElementById("root"))
    else return <CalendarItem elKey={elKey} isDisplay={isDisplay} setIsDisplay={setIsDisplay} isDragging={isDragging} itemPos={itemPos} setPos={setPos} setSize={setSize} dragStart={dragStart} indexRef={indexRef} pos={pos} setIsTop={setIsTop}/>
}