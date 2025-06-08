import getDayDiff from "../../../helpers/getDayDiff";
import CalendarItem from "./CalendarItem";
import addItem from "../helpers/addItem"
import displayDay from "../helpers/displayDay";
import { useState } from "react";

export default function CalendarDay({ date, keyArr, onChange }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    let newDateFormat = date.split(".");
    let temp = newDateFormat[0];
    newDateFormat[0] = newDateFormat[2];
    newDateFormat[2] = temp;
    let newDate = newDateFormat.map(el => el.padStart(2, "0")).join(".");
    let dayDiff = getDayDiff(newDate);

    let [day, month, year] = newDate.split(".").map(Number);
    let dateDay = new Date(year, month - 1, day);

    let arrDays = [isEn ? "Sunday" : "Неділя", isEn ? "Monday" : "Понеділок", isEn ? "Tuesday" : "Вівторок", isEn ? "Wednesday" : "Середа", isEn ? "Thursday" : "Четвер", isEn ? "Friday" : "П'ятниця", isEn ? "Saturday" : "Субота"];

    let displayHeader = displayDay(dayDiff, isEn, arrDays, dateDay)

    return (
    <div className="calendarday">
        <h4 className="calendarday__header">{newDate}, {displayHeader}</h4>
        <div className="calendarlist">
            {keyArr.map(el => <CalendarItem key={el} elKey={el} />)}
        </div>
        <div className="calendaradd">
            <p onClick={() => setIsOpenAdd(!isOpenAdd)}>+ {isEn ? "Add Task" : "Додати задачу"}</p>
            {isOpenAdd && <div className="calendarform">
                <div className="calendarform__inputs">
                    <input type="text" className="calendarform__name" placeholder={isEn ? "Task Name" : "Назва задачі"} value={name} onChange={(e) => setName(e.target.value)} />
                    <textarea name="description" id="description" className="calendarform__description" placeholder={isEn ? "Task Description" : "Опис задачі"} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <div className="calendarform__button" onClick={() => {
                    addItem(name, desc, date);
                    onChange();
                }}>{isEn ? "Create" : "Створити"}</div>
            </div>}
        </div>
    </div>
);

}