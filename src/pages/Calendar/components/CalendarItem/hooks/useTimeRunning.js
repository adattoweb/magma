import { useEffect } from "react";
import formatTime from "@/helpers/formatTime"

export default function useTimeRunning(isStart, time, setTimeStr, editItem, name, desc, isActive) {
    useEffect(() => {
        let timer;
        if (isStart) {
            timer = setInterval(() => {
                time.current += 1;
                setTimeStr(formatTime(time.current))
                editItem(name, desc, isActive)
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isStart]);
}