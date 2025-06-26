import { useState, useEffect } from 'react'
import TrackerStart from '../Trackers/components/TrackerStart'

import "./Main.css"

export default function Main(){
    const [isAdding, setIsAdding] = useState(false); // чисто щоб рендерити наново компонент
    const isTwelve = localStorage.getItem("magma-clock") === "12"
    const isEn = localStorage.getItem("settings-lang") === "en";
    const date = new Date();
    const hours = date.getHours() > 12 && isTwelve ? date.getHours() - 12 : date.getHours()
    const [time, setTime] = useState(`${(hours + "").padStart(1, "0")}:${(date.getMinutes() + "").padStart(2, "0")}`)
    useEffect(() => {
        const timeInterval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours() > 12 && isTwelve ? now.getHours() - 12 : now.getHours()
            setTime(`${(hours + "").padStart(1, "0")}:${(now.getMinutes() + "").padStart(2, "0")}`)
        }, 1000)
        return () => clearInterval(timeInterval)
    }, [])
    return (
        <div className="newmain content">
            <div className="hello">
                <h1>{isEn ? "Hello" : "Привіт"}, {localStorage.getItem("magma-name")}</h1>
                <h2>{time}</h2>
                <TrackerStart changeAdd={() => setIsAdding(!isAdding)}/>
            </div>
        </div>
    )
}