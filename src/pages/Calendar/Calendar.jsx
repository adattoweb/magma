import CalendarDay from "./ui/CalendarDay";

import useMove from "./hooks/Calendar/useMove"
import useTimeManage from "./hooks/Calendar/useTimeManage"
import useCalendarKeys from "./hooks/Calendar/useCalandarKeys";

import { useState, useRef } from "react";
import "./Calendar.css";

export default function Calendar(){
    if(localStorage.getItem("calendar-index") === null){
        localStorage.setItem("calendar-index", "0");
    }
    const [isRender, setIsRender] = useState(false);

    const [activeId, setActiveId] = useState(null)

    const [draggedKey, setDraggedKey] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedKeys, setSelectedKeys] = useState([])
    const indexRef = useRef(null)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [draggingCount, setDraggingCount] = useState(0)
    const rendersCount = useRef(0)
    const [isTop, setIsTop] = useState(false)
    console.log(++rendersCount.current)

    const [calendar, calendarKeys] = useCalendarKeys()

    const [time, setTime] = useState(10);

    useTimeManage(draggingCount, setTime)

    const handleMouseMove = useRef(null);
    useMove(handleMouseMove, time, setPos)

    return (
        <div className="calendar content">
            <div className="calendar__content newblock">
                {calendarKeys.map((el, index) => {
                    return <CalendarDay key={el} date={el} keyArr={calendar[el]} onChange={() => setIsRender(!isRender)} activeId={activeId} setActiveId={setActiveId} index={index} 
                    draggedKey={draggedKey} setDraggedKey={setDraggedKey} pos={pos} setPos={setPos} selectedDate={selectedDate} setSelectedDate={setSelectedDate} draggingCount={draggingCount} setDraggingCount={setDraggingCount}
                    indexRef={indexRef} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} isTop={isTop} setIsTop={setIsTop}/>;
                })}
            </div>
        </div>
    );    
}