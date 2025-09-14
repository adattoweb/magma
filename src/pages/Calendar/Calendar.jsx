import CalendarDay from "./components/CalendarDay/CalendarDay";
import CalendarItem from "./components/CalendarItem/CalendarItem";

import getCalendar from "./helpers/getCalendar";
import getCalendarKeys from "./helpers/sortKeys";

import { useState, useRef } from "react";
import "./Calendar.css";

import { closestCorners, DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor, DragOverlay, TouchSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { motion } from "framer-motion"

import CalendarModal from "./CalendarModal";
import Analytics from "./components/Analytics/Analytics";

import calendarImg from "@/assets/calendar.png"

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB, uk } from "date-fns/locale";

registerLocale("en-GB", enGB);
registerLocale("uk", uk);

export default function Calendar(){
    const isAdaptive = window.innerWidth < 1024

    const now = new Date()

    const threeDayAgo = new Date(now.getTime() - 86400 * 1000 * 3)
    
    const [date, setDate] = useState(isAdaptive ? threeDayAgo : now)
    const [isOpenDate, setIsOpenDate] = useState(false)
    function CalendarSwitch(){
        return (
            <>
                <img draggable={false} src={calendarImg} onClick={() => setIsOpenDate(!isOpenDate)}/>
                {isOpenDate && <DatePicker inline className="tmodal__name cdate" selected={date} onChange={(date) => {setDate(date); setCalendar(getCalendar(date))}} locale={isEn ? "en-GB" : "uk"} dateFormat={"dd.MM.yyyy"}/>}
            </>
        )
    }

    const isEn = localStorage.getItem("settings-lang") === "en"
    if(localStorage.getItem("calendar-index") === null){
        localStorage.setItem("calendar-index", "0");
    }

    const rendersCount = useRef(0)
    console.log(`Calendar renders: ${++rendersCount.current}`)

    const [calendar, setCalendar] = useState(getCalendar(date))

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
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {
            distance: 10, // активується drag тільки якщо курсор змістився на 10+ пікселів
          }}),
          useSensor(TouchSensor, {
            activationConstraint: {
                distance: 10, // активується drag тільки якщо курсор змістився на 10+ пікселів
            }}),
        useSensor(KeyboardSensor),
    )

    const [isOpen, setIsOpen] = useState(false)

    function StartButton(){
        return (
            <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} className="calendarstart" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="calendarstart__svg">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                </svg>
            </motion.div>

        )
    }

    const [activeDay, setActiveDay] = useState(`${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`)
    console.log(date)

    return (
        <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToWindowEdges]}>
            <div className="calendar content">
                <StartButton/>
                <CalendarModal isOpen={isOpen} setIsOpen={setIsOpen} calendar={calendar} setCalendar={setCalendar} startDate={date}/>
                <div className="calendar__header"><CalendarSwitch/><Analytics startDate={date}/></div>
                <div className="calendar__content newblock">
                    {getCalendarKeys(calendar).map(el => {
                        return <CalendarDay key={el} date={el} keyArr={calendar[el]} activeTaskId={activeTaskId} calendar={calendar} setCalendar={setCalendar} activeDay={activeDay} setActiveDay={setActiveDay} setDate={setDate} startDate={date}/>;
                    })}
                </div>
            </div>
            <DragOverlay >
                {activeTaskId && <CalendarItem elKey={activeTaskId} dayDate={findTaskDate(activeTaskId)} keyArr={calendar[findTaskDate(activeTaskId)]} activeTaskId={activeTaskId} isDragging={true} startDate={date}/>}
            </DragOverlay>
        </DndContext>
    );    
}
