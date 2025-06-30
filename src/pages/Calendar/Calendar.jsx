import CalendarDay from "./components/CalendarDay/CalendarDay";

import useMove from "./hooks/useMove"
import useCalendarKeys from "./hooks/useCalandarKeys";

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
    const [activeMenu, setActiveMenu] = useState(null)
    const rendersCount = useRef(0)
    const [isTop, setIsTop] = useState(false)
    console.log(`Calendar renders: ${++rendersCount.current}`)

    const [calendar, calendarKeys] = useCalendarKeys()

    useMove(setPos, draggingCount)

    return (
        <div className="calendar content">
            <div className="calendar__content newblock">
                {calendarKeys.map((el, index) => {
                    return <CalendarDay key={el} date={el} keyArr={calendar[el]} onChange={() => setIsRender(!isRender)} activeId={activeId} setActiveId={setActiveId} index={index} 
                    draggedKey={draggedKey} setDraggedKey={setDraggedKey} pos={pos} setPos={setPos} selectedDate={selectedDate} setSelectedDate={setSelectedDate} draggingCount={draggingCount} setDraggingCount={setDraggingCount}
                    indexRef={indexRef} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} isTop={isTop} setIsTop={setIsTop} activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>;
                })}
            </div>
        </div>
    );    
}

// змінні які ми юзаємо щоб передати дочірнім елементам:
// setDraggedKey, pos, setPos, setDraggingCount, selectedKeys, setIsTop, activeMenu, setActiveMenu тобто це все передається просто в RenderCalendarItem, в самому CalendarDay ніде не використовується