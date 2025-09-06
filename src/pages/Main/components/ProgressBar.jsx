import { useState, useEffect } from "react"

export default function ProgressBar({ isZeroTime, isTrackingRef, timeRef, stopTracking, dasharray, circleRef, r, formatTime, displayTimeRef }){
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