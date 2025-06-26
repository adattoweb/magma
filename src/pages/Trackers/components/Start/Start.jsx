import stoppause from "@/assets/pause.png";
import pause from "@/assets/pause2.png";
import start from "@/assets/start.png";


import formatTime from "@/helpers/formatTime";
import useTimeInterval from "./hooks/useTimeInterval";

import addItem from "../TrackerStart/helpers/addItem";
import { useState } from "react";

export default function Start({ time, setTime, devAdd, name, changeAdd, project }) {
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const isEn = localStorage.getItem("settings-lang") === "en";

    useTimeInterval(isTimeRunning, setTime, time)

    function changeTimeRunning() {
        if(time === 0){ // якщо ми починаємо відслідковувати час, то запам'ятаємо початок, щоб потім коректно відобразити
            const now = new Date();
            let startTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            localStorage.setItem("tracker-start", startTime)
        }
        setIsTimeRunning(!isTimeRunning)
    }
    
    function stopTracker(){
        addItem(name, isEn, setTime, changeAdd, project, time);
        setTime(0);
        setIsTimeRunning(false);
    }

    return (
        <div className="trackers__start">
            <p>{formatTime(time)}</p>
            <img draggable={false} onClick={changeTimeRunning} src={isTimeRunning ? pause : start} alt="start tracking" onDragOver={devAdd} />
            {time > 0 &&
                <img draggable={false} onClick={stopTracker} src={stoppause} alt="stop tracking" />}
        </div>
    );
}