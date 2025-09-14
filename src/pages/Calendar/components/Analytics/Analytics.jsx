import "./Analytics.css"

import { useState } from "react"
import analImg from "@/assets/anal1.png"
import Modal from "@/components/Modal/Modal"
import getCalendar from "../../helpers/getCalendar"

export default function Analytics({ startDate }) {
    console.log(startDate)
    const [isOpen, setIsOpen] = useState(false)
    const isEn = localStorage.getItem("settings-lang") === "en"
    const maxWidth = 200;
    const calendar = getCalendar(startDate)
    const calendarKeys = Object.keys(calendar)
    const completedTasks = {}
    let maxCompletedTasks = 0;
    for(let i = 0; i < calendarKeys.length; i++){
        const key = calendarKeys[i]
        let countCompleted = 0;
        if(key === "overdue") continue
        for(let j = 0; j < calendar[key].length; j++){
            const array = localStorage.getItem(calendar[key][j]).split("^")
            if(array[5] === "true") countCompleted++
        }
        completedTasks[key] = countCompleted
        if(countCompleted > maxCompletedTasks) maxCompletedTasks = countCompleted
    }
    console.log(completedTasks, maxCompletedTasks)
    function Item({ elKey, value }){
        let width = maxWidth / maxCompletedTasks * value
        if(width === 0) width = 5
        const arrayDate = elKey.split(".")
        const date = new Date(+arrayDate[0], +arrayDate[1] - 1, +arrayDate[2])
        const day = date.toLocaleDateString(isEn ? "en-GB" : "uk-UA", { weekday: "short" })
        const dayWithCapital = day.charAt(0).toUpperCase() + day.slice(1);
        return (
            <div className="amodalitem">
                <div className="amodalitem__progress" style={{width: width}}></div>
                <div className="amodalitem__name">{dayWithCapital} <span>{value}</span></div>
            </div>
        )
    }
    return (
        <>
            <Modal className="amodal" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h3 className="amodal__name">{isEn ? "Productivity" : "Продуктивність"}</h3>
                <div className="amodal__content">
                    <h4>{isEn ? "Completed in last 7 days" : "Виконані за останні 7 днів"}</h4>
                    <div className="amodal__list">
                        {Object.keys(completedTasks).map(el => <Item key={el} elKey={el} value={completedTasks[el]}/>)}
                    </div>
                </div>
            </Modal>
            <img draggable={false} src={analImg} onClick={() => setIsOpen(true)}/>
        </>
    )
}