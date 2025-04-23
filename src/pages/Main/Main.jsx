import "./Main.css"
import { useState, useEffect, useRef } from 'react'

export default function Main(){
    const isEn = localStorage.getItem("settings-lang") === "en";
    const date = new Date();
    const [time, setTime] = useState(`${(date.getHours() + "").padStart(2, "0")}:${(date.getMinutes() + "").padStart(2, "0")}`)
    useEffect(() => {
        const timeInterval = setInterval(() => {
            const now = new Date();
            setTime(`${(now.getHours() + "").padStart(2, "0")}:${(now.getMinutes() + "").padStart(2, "0")}`)
        }, 1000)
        return () => clearInterval(timeInterval)
    }, [])
    const helloRef = useRef()
    const idThemes = [0, 1] // Теми, де колір тексту повинен бути чорний
    useEffect(() => {
        if(idThemes.includes(+localStorage.getItem("settings-bg"))) helloRef.current.style.color="#000"
    }, [])
    return (
        <div className="newmain content">
            <div className="hello" ref={helloRef}>
                <h1>{isEn ? "Hello" : "Привіт"}, {localStorage.getItem("magma-name")}</h1>
                <h2>{time}</h2>
            </div>
        </div>
    )
}
{/* <input type="text" value={name} onChange={(e) => {
    setName(e.target.value)
    localStorage.setItem("magma-name", e.target.value)
}} /> */}