import stoppause from "../../../assets/pause.png";
import pause from "../../../assets/pause2.png";
import start from "../../../assets/start.png";

import formatTime from "../../../helpers/formatTime";
import { useState, useEffect } from "react";

export default function Start({ time, setTime, addItem, devAdd }) {
    const [isTimeRunning, setIsTimeRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isTimeRunning) {
            timer = setInterval(() => {
                setTime((prev) => prev + 1);
                localStorage.setItem("tracker-time", time+1)
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isTimeRunning, time]);

    function changeTimeRunning() {
        if(time === 0){ // якщо ми починаємо відслідковувати час, то запам'ятаємо початок, щоб потім коректно відобразити
            const now = new Date();
            let startTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            localStorage.setItem("tracker-start", startTime)
        }
        setIsTimeRunning(!isTimeRunning)
    }

    function stopTracker(){
        addItem();
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