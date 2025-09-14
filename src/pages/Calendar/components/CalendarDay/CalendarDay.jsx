import getDate from "./helpers/getDate";

import CalendarItem from "../CalendarItem/CalendarItem";

import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from '@dnd-kit/core';
import getCalendar from "../../helpers/getCalendar";

export default function CalendarDay({ date, keyArr, activeTaskId, calendar, setCalendar, activeDay, setActiveDay, setDate, startDate }) {
    if (keyArr.length === 0 && date.toLowerCase() === "overdue") return
    const isEn = localStorage.getItem("settings-lang") === "en";

    const isAdaptive = window.innerWidth < 1024

    let [header, newDate] = getDate(isEn, date, isAdaptive)

    const isOverdue = date.toLowerCase() === "overdue"

    const { setNodeRef } = useDroppable({ id: date, data: { isDay: true } });

    const dateArr = date.split(".")

    function switchDay(){
        if(isAdaptive){
            const newCalendarDate = new Date(+dateArr[0], +dateArr[1] - 1, +dateArr[2] - 3)
            setActiveDay(date)
            setDate(newCalendarDate)
            setCalendar(getCalendar(newCalendarDate))
        }
    }

    return (
        <div className={`calendarday${isAdaptive && activeDay === date ? " active" : ""}`} ref={setNodeRef} id={`${isOverdue ? "overdue" : ""}`}>
            <h4 className={`calendarday__header${keyArr.length > 0 ? " active" : ""}`} onClick={switchDay}>{newDate}{newDate && !isAdaptive ? "," : ""} {!isAdaptive && header}</h4>
            <div className="calendarlist">
                <SortableContext items={keyArr} strategy={verticalListSortingStrategy}>
                    {keyArr.map(el => <CalendarItem key={el} elKey={el} keyArr={keyArr} dayDate={header} activeTaskId={activeTaskId} calendar={calendar} setCalendar={setCalendar} startDate={startDate}/>)}
                </SortableContext>
            </div>
        </div>
    );
}
//         {!isOverdue && <CalendarAdd/> }