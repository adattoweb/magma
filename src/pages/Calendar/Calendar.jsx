import CalendarDay from "./components/CalendarDay/CalendarDay";

import useCalendarKeys from "./hooks/useCalandarKeys";

import { useState, useRef } from "react";
import "./Calendar.css";

export default function Calendar(){
    if(localStorage.getItem("calendar-index") === null){
        localStorage.setItem("calendar-index", "0");
    }
    const [isRender, setIsRender] = useState(false);

    const [activeId, setActiveId] = useState(null)

    const [activeMenu, setActiveMenu] = useState(null)
    const rendersCount = useRef(0)
    console.log(`Calendar renders: ${++rendersCount.current}`)

    const [calendar, calendarKeys] = useCalendarKeys()


    return (
        <div className="calendar content">
            <div className="calendar__content newblock">
                {calendarKeys.map((el, index) => {
                    return <CalendarDay key={el} date={el} arrayKeys={calendar[el]} onChange={() => setIsRender(!isRender)} activeId={activeId} setActiveId={setActiveId} index={index} 
                     activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>;
                })}
            </div>
        </div>
    );    
}

// змінні які ми юзаємо щоб передати дочірнім елементам:
// setDraggedKey, pos, setPos, setDraggingCount, selectedKeys, setIsTop, activeMenu, setActiveMenu тобто це все передається просто в RenderCalendarItem, в самому CalendarDay ніде не використовується