import CalendarDay from "./components/CalendarDay/CalendarDay";
import CalendarItem from "./components/CalendarItem/CalendarItem";

import getCalendar from "./helpers/getCalendar";
import getCalendarKeys from "./helpers/sortKeys";

import { useState, useRef } from "react";
import "./Calendar.css";

import { closestCorners, DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

export default function Calendar(){
    if(localStorage.getItem("calendar-index") === null){
        localStorage.setItem("calendar-index", "0");
    }

    const [activeId, setActiveId] = useState(null)

    const [activeMenu, setActiveMenu] = useState(null)
    const rendersCount = useRef(0)
    console.log(`Calendar renders: ${++rendersCount.current}`)

    const [calendar, setCalendar] = useState(getCalendar())

    const [activeTaskId, setActiveTaskId] = useState(null)
    const activeDateRef = useRef(null)

    function findTaskDate(id){
        for(let key in calendar){
          if(calendar[key].some(el => el === id)) return key
        }
        throw new Error("The task was not found.")
    }

    function updatePosition(array){
        for(let i = 0; i < array.length; i++){
            const arrayValues = localStorage.getItem(array[i]).split("^")
            arrayValues[7] = i;
            localStorage.setItem(array[i], arrayValues.join("^"))
        }
    }

    function updateDate(key, date){
        const dateArr = date.split(".")
        const array = localStorage.getItem(key).split("^")
        array[2] = dateArr[0]
        array[3] = dateArr[1]
        array[4] = dateArr[2]
        localStorage.setItem(key, array.join("^"))
    }

    function handleDragStart({active}){
        setActiveTaskId(active.id)
        activeDateRef.current = findTaskDate(active.id)
    }
    function handleDragOver({active, over}){
        if(!over) return

        const activeDate = findTaskDate(active.id)
        const activeIndex = calendar[activeDate].findIndex(el => el === active.id)

        const newCalendar = {...calendar}

        if(over.data.current.isDay && activeDate !== over.id){ // якщо переміщення між днями, АЛЕ конкретну задачу не обрано
            if(over.id.toLowerCase().includes("overdue")) return
            newCalendar[activeDate].splice(activeIndex, 1)
            newCalendar[over.id].push(active.id)
            return
        } else if(over.data.current.isDay) return
        
        const overDate = findTaskDate(over.id)
        const overIndex = calendar[overDate].findIndex(el => el === over.id)

        if(activeDate === overDate){ // якщо переміщення внутрішьно між днями
            newCalendar[activeDate] = arrayMove(newCalendar[activeDate], activeIndex, overIndex)
        } else {
            if(overDate.toLowerCase().includes("overdue")) return
            newCalendar[activeDate].splice(activeIndex, 1)
            newCalendar[overDate].splice(overIndex, 0, active.id)

        }
        setCalendar(newCalendar)
    }
    function handleDragEnd({ active, over }){
        setActiveTaskId(null)

        if(!over) return

        const activeDate = findTaskDate(active.id)
        const activeIndex = calendar[activeDate].findIndex(el => el === active.id)

        const newCalendar = {...calendar}

        if(over.data.current.isDay && activeDate !== over.id){ // якщо переміщення між днями, АЛЕ конкретну задачу не обрано
            if(over.id.toLowerCase().includes("overdue")) return
            newCalendar[activeDate].splice(activeIndex, 1)
            newCalendar[over.id].push(active.id)
            updatePosition(newCalendar[activeDate])
            updateDate(active.id, over.id) // в over.id як ключ зберігається дата
            console.log("1")
            return
        } else if(over.data.current.isDay) return
        
        const overDate = findTaskDate(over.id)
        const overIndex = calendar[overDate].findIndex(el => el === over.id)

        console.log(newCalendar)
        if(activeDateRef.current === overDate){ // якщо переміщення внутрішьно між днями
            newCalendar[activeDate] = arrayMove(newCalendar[activeDate], activeIndex, overIndex)
            updatePosition(newCalendar[activeDate])
            console.log("2")
            console.log(activeDateRef.current, overDate)
        } else { // ще дату треба зберігати
            if(overDate.toLowerCase().includes("overdue")) return
            newCalendar[activeDate].splice(activeIndex, 1)
            newCalendar[overDate].splice(overIndex, 0, active.id)

            updatePosition(newCalendar[activeDate])
            updatePosition(newCalendar[overDate])

            updateDate(active.id, overDate)
            console.log("3")
        }
        setCalendar(newCalendar)
        console.log(newCalendar)
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {
            distance: 10, // активується drag тільки якщо курсор змістився на 10+ пікселів
          }}),
        useSensor(KeyboardSensor),
    )

    console.log(calendar)

    return (
        <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToWindowEdges]}>
            <div className="calendar content">
                <div className="calendar__content newblock">
                        {getCalendarKeys(calendar).map((el, index) => {
                            return <CalendarDay key={el} date={el} keyArr={calendar[el]} activeId={activeId} setActiveId={setActiveId} index={index} 
                            activeMenu={activeMenu} setActiveMenu={setActiveMenu} activeTaskId={activeTaskId} calendar={calendar} setCalendar={setCalendar}/>;
                        })}
                </div>
            </div>
            <DragOverlay >
                {activeTaskId && <CalendarItem elKey={activeTaskId} dayDate={findTaskDate(activeTaskId)} activeMenu={activeMenu} setActiveMenu={setActiveMenu} keyArr={calendar[findTaskDate(activeTaskId)]} activeTaskId={activeTaskId} isDragging={false}/>}
            </DragOverlay>
        </DndContext>
    );    
}
