import { useState } from "react";
import "./Calendar.css";
import getDayDiff from "../getDayDiff";
import deleteImg from "../assets/delete.png";

export default function CalendarDay({ date, keyArr, onChange }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    function CalendarItem({ index, name, desc, isActive, elKey }) {
        const [isDisplay, setIsDisplay] = useState(true);
        const [newIsActive, setNewIsActive] = useState(isActive);
        const [newName, setNewName] = useState(name);
        const [newDesc, setNewDesc] = useState(desc);

        function editItem(actualName, actualDesc, actualIsActive) {
            let oldArr = elKey.split("@")[1].split("^");
            localStorage.removeItem(`calendar-item-${index}@${newName}^${newDesc}^${oldArr[2]}^${oldArr[3]}^${oldArr[4]}`);
            localStorage.setItem(`calendar-item-${index}@${actualName}^${actualDesc}^${oldArr[2]}^${oldArr[3]}^${oldArr[4]}`, actualIsActive);
        }
        function deleteItem() {
            let oldArr = elKey.split("@")[1].split("^");
            localStorage.removeItem(`calendar-item-${index}@${newName}^${newDesc}^${oldArr[2]}^${oldArr[3]}^${oldArr[4]}`);
            setIsDisplay(false);
        }
        if (!isDisplay) return null;
        return (
            <div className="calendaritem">
                <div className={newIsActive ? "calendaritem__circle active" : "calendaritem__circle"} onClick={() => {
                    setNewIsActive(!newIsActive);
                    editItem(newName, newDesc, !newIsActive);
                }}></div>
                <div className="calendaritem__text">
                    <input type="text" value={newName} placeholder={isEn ? "Task Name" : "Назва задачі"} onChange={(e) => {
                        setNewName(e.target.value);
                        editItem(e.target.value, newDesc, newIsActive);
                    }} />
                    <input type="text" placeholder={isEn ? "Task Description" : "Опис задачі"} value={newDesc} onChange={(e) => {
                        setNewDesc(e.target.value);
                        editItem(newName, e.target.value, newIsActive);
                    }} />
                </div>
                <img src={deleteImg} className="calendaritem__delete" onClick={deleteItem} />
            </div>
        );
    }

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    let dateArr = date.split(".");

    function addItem() {
        if (name.length === 0) return;

        // for (let i = 0; i < localKeys.length; i++) { // перевірка на повторення
        //     if (localKeys[i].includes("calendar-item")) {
        //         let localArr = localKeys[i].split("@")[1].split("^")
        //         if (localArr[0] === name && localArr[1] === desc && localArr[2] === dateArr[0] && localArr[3] === dateArr[1] && localArr[4] === dateArr[2]) {
        //             return;
        //         }
        //     }
        // }
        let newName = name.replace(/(@|\^)+/g, ".");
        let index = +localStorage.getItem("calendar-index");
        localStorage.setItem("calendar-index", index+1);
        localStorage.setItem(`calendar-item-${index}@${newName}^${desc}^${dateArr[0]}^${dateArr[1]}^${dateArr[2]}`, "false");
    }

    let newDateFormat = date.split(".");
    let temp = newDateFormat[0];
    newDateFormat[0] = newDateFormat[2];
    newDateFormat[2] = temp;
    let newDate = newDateFormat.map(el => el.padStart(2, "0")).join(".");
    let dayDiff = getDayDiff(newDate);

    let [day, month, year] = newDate.split(".").map(Number);
    let dateDay = new Date(year, month - 1, day);

    let arrDays = [isEn ? "Sunday" : "Неділя", isEn ? "Monday" : "Понеділок", isEn ? "Tuesday" : "Вівторок", isEn ? "Wednesday" : "Середа", isEn ? "Thursday" : "Четвер", isEn ? "Friday" : "П'ятниця", isEn ? "Saturday" : "Субота"];

    let displayHeader = dayDiff === 0 ? (isEn ? "Today" : "Сьогодні")
        : dayDiff === -1 ? (isEn ? "Tomorrow" : "Завтра")
            : dayDiff === 1 ? (isEn ? "Yesterday" : "Вчора")
                : dayDiff === 2 ? (isEn ? "Day Before Yesterday" : "Позавчора")
                    : arrDays[dateDay.getDay()];

    return (
        <div className="calendarday">
            <h4 className="calendarday__header">{newDate}, {displayHeader}</h4>
            <div className="calendarlist">
                {keyArr.map(el => {
                    let array = el.split("@")[1].split("^");
                    let index = el.split("@")[0].split("-")[2];
                    console.log(index, array);
                    let isActive = localStorage.getItem(el) === "true" ? true : false;
                    return <CalendarItem index={index} key={el} elKey={el} name={array[0]} desc={array[1]} isActive={isActive} />;
                })}
            </div>
            <div className="calendaradd">
                <p onClick={() => setIsOpenAdd(!isOpenAdd)}>+ {isEn ? "Add Task" : "Додати задачу"}</p>
                {isOpenAdd && <div className="calendarform">
                    <div className="calendarform__inputs">
                        <input type="text" className="calendarform__name" placeholder={isEn ? "Task Name" : "Назва задачі"} value={name} onChange={(e) => setName(e.target.value)} />
                        <textarea name="description" id="description" className="calendarform__description" placeholder={isEn ? "Task Description" : "Опис задачі"} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="calendarform__button" onClick={() => {
                        addItem();
                        onChange();
                    }}>{isEn ? "Create" : "Створити"}</div>
                </div>}
            </div>
        </div>
    );
}