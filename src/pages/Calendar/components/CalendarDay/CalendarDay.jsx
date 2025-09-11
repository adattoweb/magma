import getDate from "./helpers/getDate";

import CalendarItem from "../CalendarItem/CalendarItem";

import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from '@dnd-kit/core';

export default function CalendarDay({ date, keyArr, activeId, setActiveId, index, activeMenu, setActiveMenu, activeTaskId, calendar, setCalendar }) {
    if(keyArr.length === 0 && date.toLowerCase() === "overdue") return
    const isEn = localStorage.getItem("settings-lang") === "en";

    let [header, newDate] = getDate(isEn, date)

    const isOverdue = date.toLowerCase() === "overdue"

    const {setNodeRef} = useDroppable({id: date, data: {isDay: true}});

    return (
        <>
        <div className="calendarday" ref={setNodeRef} id={`${isOverdue ? "overdue" : ""}`}>
            <h4 className={`calendarday__header${keyArr.length > 0 ? " active" : ""}`}>{newDate}{newDate ? "," : ""} {header}</h4>
            <div className="calendarlist">
                <SortableContext items={keyArr} strategy={verticalListSortingStrategy}>
                    {keyArr.map(el => <CalendarItem key={el} elKey={el} keyArr={keyArr} dayDate={header} activeMenu={activeMenu} setActiveMenu={setActiveMenu} activeTaskId={activeTaskId} calendar={calendar} setCalendar={setCalendar} />)}
                </SortableContext>
            </div>
        </div>
        </>
    );
}
//         {!isOverdue && <CalendarAdd/> }