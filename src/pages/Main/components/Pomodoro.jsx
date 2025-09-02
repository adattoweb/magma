import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import "./Pomodoro.css"
import start from "@/assets/start.png"
import pause from "@/assets/pause2.png"
import reset from "@/assets/reset.png"

export default function Pomodoro(){
    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        if(m === 0) return s;
        if(h === 0) return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; 
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const timeRef = useRef("")
    const isTrackingRef = useRef(false)
    const isZeroTime = useRef(false)
    const displayTimeRef = useRef()
    const circleRef = useRef()

    const r = 80
    const dasharray = 2 * 3.1415 * r

    let stopTracking = () => {

    }

    function Form() {
        const [isActive, setIsActive] = useState(false)
        const [error, setError] = useState(false)
        const [isStart, setIsStart] = useState(false)
        const [isTracking, setIsTracking] = useState(false)
        const isEn = localStorage.getItem("settings-lang") === "en";

        useEffect(() => {
            console.log(isTracking, isActive)
        })

        function changeOpen() {
            setIsActive(prev => !prev)
        }

        function StartButton({ isRounded, src, onClick }) {
            return (
                <motion.img draggable={false} src={src} alt="start image" className="start-img" key={isRounded ? "rounded" : "flat"} style={{borderRadius: isRounded ? "50%" : "0% 50% 50% 0%"}} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: isRounded ? 0 : 1 }} onClick={onClick} />
            )
        }

        const spinRef = useRef()
        let isAnimating = false;
        function startSpin(ref){
            if(!isAnimating){
                isAnimating = true
                ref.current?.classList.add("spin")
                setTimeout(() => {
                    if(ref.current){
                        ref.current?.classList.remove("spin")
                        isAnimating = false
                    }
                }, 1000)
            }
        }

        function startTracking(){
            circleRef.current.style.strokeDashoffset = ""
            const value = timeRef.current
            console.log(value)
            if(value.length === 0) {
                if(error) return
                setError(isEn ? "Complete the field" : `Заповніть поле`)
                setTimeout(() => setError(false), 6000)
                return
            }
            if(isTracking){
                isTrackingRef.current = false
                setIsTracking(false)
                return
            }
            if(!timeRef.current) {
                isTrackingRef.current = true
                setIsTracking(true)
                return
            }
            if((/^\d{1,2}(?::[0-5]\d){0,2}$/).test(value)) {
                setIsTracking(true)
                isTrackingRef.current = true
                setIsStart(true)
                setError(false)
            } else {
                if(error) return
                setError(isEn ? "Correct formats: \n hh:mm:ss, mm:ss or ss \n h - hours, m - minutes, s - seconds." : `Правильні формати: \n гг:хх:сс, хх:сс або сс \n г - години, х - хвилини, с - секунди.`)
                setTimeout(() => setError(false), 15000)
            }
        }

        stopTracking = () => {
            startSpin(spinRef)
            setIsTracking(false)
            setIsStart(false)
            isZeroTime.current = true
            isTrackingRef.current = false
            displayTimeRef.current.innerHTML = "0"
            circleRef.current.style.strokeDashoffset = dasharray
        }
        
        return (
            <div className="pform">
            <AnimatePresence mode="wait">
                {!isActive && (<StartButton key="start-rounded" isRounded={true} src={start} onClick={changeOpen}/>)}
                {isActive &&
                    (<>
                        <motion.div key="form" className="pform" style={{backgroundColor: "#fff"}} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1, blur: 0, width: isStart ? 100 : 200 }} exit={{ y: 100, opacity: 0, transition: { duration: 0.35 } }}>
                        <AnimatePresence mode="wait">
                            {!isStart && <motion.div className="dropdown__pform" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0}}>
                                <input className={`pform__input${error ? " pform__error": ""}`} type="text" onChange={(e) => timeRef.current = e.target.value} placeholder="30:00"/>
                            </motion.div>}
                        </AnimatePresence>
                            <motion.div layout className="start__container">
                                <motion.img src={reset} alt="start image" style={{background: "rgba(255,255,255,0)"}} className="start-img" onClick={stopTracking} ref={spinRef} transition={{duration: 0.6}} draggable={false}/>
                                <StartButton key="start-flat" isRounded={false} src={!isStart || !isTracking ? start : pause} onClick={startTracking}/>
                            </motion.div>
                        </motion.div>
                    </>)}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {error && <motion.div key="main-error" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="main__error">{error}</motion.div>}
            </AnimatePresence>
            </div>
        )
    }

    function ProgressBar(){
        const [time, setTime] = useState(0)
        useEffect(() => {
                const timeInterval = setInterval(() => {
                    if(isZeroTime.current) {
                        setTime(0)
                        isZeroTime.current = false
                    }
                    if(isTrackingRef.current) {
                        setTime(prev => prev + 1)
                    }
                }, 1000)
                return () => clearInterval(timeInterval)
        }, [])
        useEffect(() => {
            if(time >= timeToNumber(timeRef.current)){
                setTime(0)
                isTrackingRef.current = false
                stopTracking()
            }
        }, [time])
        function timeToNumber(timeStr){
            if(!timeStr) return 0
            const array = timeStr.split(":")
            let sum = 0;
            for(let i = 0; i < array.length; i++){
                const multiplier = 60 ** (array.length - (i + 1))
                sum += +array[i] * multiplier
            }
            return sum
        }
        function calculateDashoffset(){
            let result = dasharray - (dasharray * (time / timeToNumber(timeRef.current)))
            if(isNaN(result)) result = 0
            if(result === 0) return dasharray
            return result
        }
        return (
            <div className="percent">
            <svg className="percent__svg">
                <circle cx={r} cy={r} r={r}></circle> {/* stroke-dasharray = 2 * π * r */}
                <circle cx={r} cy={r} r={r} className="percent__active" strokeDashoffset={calculateDashoffset()} strokeDasharray={dasharray} ref={circleRef}></circle>
            </svg>
            <div className="number">
                <h2><span ref={displayTimeRef}>{formatTime(time)}</span> {timeRef.current.length >= 1 && <span className="alltime">/ {timeRef.current}</span>}</h2>
            </div>
        </div>
        )

    }
    return (
        <div className="pomodoro">
            <ProgressBar/>
            <Form></Form>
        </div>
    )
}
