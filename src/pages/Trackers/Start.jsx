import { useState, useEffect } from "react";
import formatTime from "../../helpers/formatTime";
import pause from "../../assets/pause.png";
import start from "../../assets/start.png";

export default function Start({changeTime, addItem}) {
    const [isTime, setIsTime] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isTime) {
            timer = setInterval(() => {
                setTime((prev) => prev + 1);
                changeTime((time+1));
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isTime, time]);

    return (
        <div className="trackers__start">
        <p>{formatTime(time)}</p>
        <img onClick={() => {
            if(isTime) {
                addItem();
                setTime(0);
            }
            else {
                const now = new Date();
                localStorage.setItem("start-time", `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
            }
            setIsTime(!isTime);
        }} src={isTime ? pause : start} alt="почати" />
    </div>
    );
}