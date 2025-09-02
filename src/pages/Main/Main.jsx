import { useState } from 'react'

import useTimeInterval from './hooks/useTimeInterval';
import Pomodoro from './components/Pomodoro';

import "./Main.css"

export default function Main(){
    const isTwelveMode = localStorage.getItem("magma-clock") === "12"
    const isEn = localStorage.getItem("settings-lang") === "en";
    const date = new Date();
    const hours = date.getHours() > 12 && isTwelveMode ? date.getHours() - 12 : date.getHours()
    function Time(){
        const [time, setTime] = useState(`${(hours + "").padStart(1, "0")}:${(date.getMinutes() + "").padStart(2, "0")}`)
        useTimeInterval(setTime, isTwelveMode)
        return <h2 className="hello__time">{time}</h2>
    }
    return (
        <div className="newmain content">
            <div className="hello">
                <h1 className="hello__greetings">{isEn ? "Hello" : "Привіт"}, {localStorage.getItem("magma-name")}</h1>
                <Time/>
                <Pomodoro/>
            </div>
        </div>
    )
}