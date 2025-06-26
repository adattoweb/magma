import { useEffect } from "react";

export default function useTimeInterval(setTime, isTwelveMode){
    useEffect(() => {
        const timeInterval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours() > 12 && isTwelveMode ? now.getHours() - 12 : now.getHours()
            setTime(`${(hours + "").padStart(1, "0")}:${(now.getMinutes() + "").padStart(2, "0")}`)
        }, 1000)
        return () => clearInterval(timeInterval)
    }, [])
}