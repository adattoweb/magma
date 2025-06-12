import CalendarDay from "./ui/CalendarDay";
import getDayDiff from "../../helpers/getDayDiff";
import throttle from "../../helpers/throttle";
import { useState, useEffect, useCallback } from "react";
import "./Calendar.css";

export default function Calendar(){
    if(localStorage.getItem("calendar-index") === null){
        localStorage.setItem("calendar-index", "0");
    }
    const [isRender, setIsRender] = useState(false);
    let localKeys = Object.keys(localStorage);

    const [activeId, setActiveId] = useState(null)

    const [draggedKey, setDraggedKey] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)
    const [pos, setPos] = useState({ x: 0, y: 0 }) // може у localStorage?? щоб можна було звертатись коли захочеш і без зайвих рендерів
    // console.log(draggedKey)
    
    let calendar = {};
    for(let i = 0; i < localKeys.length; i++){ // Створюємо об'єкт в якому будуть наші ключики і значення
        if(localKeys[i].includes("calendar-item")){
            let localArr = localStorage.getItem(localKeys[i]).split("^")
            // console.log(localArr);
            let date = localArr[2]+"." + localArr[3]+"." + localArr[4];

            let newDateFormat = date.split(".");
            let temp = newDateFormat[0];
            newDateFormat[0] = newDateFormat[2];
            newDateFormat[2] = temp;
            let newDate = newDateFormat.map(el => el.padStart(2, "0")).join(".");
            let dayDiff = getDayDiff(newDate);
            // console.log(dayDiff);
            if(dayDiff >= 1) {
                if(!calendar.expired){
                    calendar.expired = [localKeys[i]]
                } else {
                    calendar.expired.push(localKeys[i])
                }
            } else if(!calendar[date]){
                calendar[date] = [localKeys[i]];
            } else{
                calendar[date].push(localKeys[i]);
            }
        }
    }
    let sevenDays = [];
    for(let i = 1; i <= 7; i++){
        let date = new Date();
        date.setDate(date.getDate() + i-1);
        sevenDays.push(`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`);
    }
    // console.log(sevenDays);
    for(let i = 0; i < sevenDays.length; i++){
        if(calendar[sevenDays[i]] === undefined) {
            calendar[sevenDays[i]] = [];
        }
    }
    for(let key in calendar){ // сортуємо задачі (спочатку найновіші потім внизу найстаріші)
        calendar[key].sort((a,b) => +a.split("-")[2] - +b.split("-")[2])
    }
    // console.log(Object.keys(calendar));
    let calendarKeys = Object.keys(calendar);
    calendarKeys.sort((a, b) => {
        if(a === "expired") return -1;
        else if(b === "expired") return 1
        let dateA = new Date(...a.split(".").map(Number));
        let dateB = new Date(...b.split(".").map(Number));
        return dateA - dateB;
    });

    const handleMouseMove = useCallback(throttle((e) => {
        setPos({ x: e.clientX, y: e.clientY });
      }, 8), []); // 125 FPS
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [])

    return (
        <div className="calendar content">
            <div className="calendar__content newblock">
                {calendarKeys.map((el, index) => {
                    return <CalendarDay key={el} date={el} keyArr={calendar[el]} onChange={() => setIsRender(!isRender)} activeId={activeId} setActiveId={setActiveId} index={index} draggedKey={draggedKey} setDraggedKey={setDraggedKey} pos={pos} setPos={setPos} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>;
                })}
            </div>
        </div>
    );    
}