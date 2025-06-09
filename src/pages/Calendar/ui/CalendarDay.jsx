import next from "../../../assets/next.png"

import addItem from "../helpers/addItem"
import displayHeader from "../helpers/displayHeader";
import CalendarItem from "./CalendarItem";
import { useState } from "react";

export default function CalendarDay({ date, keyArr, onChange }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    let [header, newDate] = [`${isEn ? "Expired" : "Просрочено"}`, ""]
    if(date !== "expired") {
        let [headerGived, newDateGived] = displayHeader(date)
        header = headerGived;
        newDate = newDateGived;
    }

    return (
    <div className="calendarday">
        <h4 className="calendarday__header">{newDate}{newDate ? "," : ""} {header}</h4>
        <div className="calendarlist">
            {keyArr.map(el => <CalendarItem key={el} elKey={el} />)}
        </div>
        <div className="calendaradd">
            <p onClick={() => setIsOpenAdd(!isOpenAdd)}>+ {isEn ? "Add Task" : "Додати задачу"}</p>
            {isOpenAdd && <div className="calendarform">
                <div className="calendarform__inputs">
                    <input type="text" className="calendarform__name calendarforminput" placeholder={isEn ? "Task Name" : "Назва задачі"} value={name} onChange={(e) => setName(e.target.value)} />
                    <textarea name="description" id="description" className="calendarform__description calendarforminput" placeholder={isEn ? "Task Description" : "Опис задачі"} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <div className="calendar__footer">
                    <img src={next} alt="add" className="calendarform__button" onClick={() => {
                        addItem(name, desc, date, setName, setDesc);
                        onChange();
                    }}/>
                </div>
            </div>}
        </div>
    </div>
);

}