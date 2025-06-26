import { useEffect } from "react";

export default function useTimeInterval(isTimeRunning, setTime, time) {
    useEffect(() => {
        let timer;
        if (isTimeRunning) {
            timer = setInterval(() => {
                setTime((prev) => prev + 1);
                localStorage.setItem("tracker-time", time + 1)
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isTimeRunning, time]);
}