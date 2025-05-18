import { useState, useEffect } from "react";
import formatTime from "../../../helpers/formatTime";
import pause from "../../../assets/pause.png";
import stoppause from "../../../assets/stoppause.png";
import start from "../../../assets/start.png";

export default function Start({ changeTime, addItem, devAdd }) {
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [time, setTime] = useState(+localStorage.getItem("tracker-time"));

    useEffect(() => {
        let timer;
        if (isTimeRunning) {
            timer = setInterval(() => {
                setTime((prev) => prev + 1);
                changeTime((time + 1));
                localStorage.setItem("tracker-time", time+1)
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isTimeRunning, time]);

    return (
        <div className="trackers__start">
            <p>{formatTime(time)}</p>
            <img onClick={() => {
                setIsTimeRunning(!isTimeRunning)
                if(!isTimeRunning){
                    const now = new Date();
                    localStorage.setItem("start-time", `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
                }
            }} src={isTimeRunning ? stoppause : start} alt="почати" onDragOver={devAdd} />
            {time > 0 &&
                <img onClick={() => {
                    addItem();
                    setTime(0);
                    setIsTimeRunning(false);
                }} src={pause} alt="почати" />}
        </div>
    );
}