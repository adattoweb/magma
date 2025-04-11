import deleteImg from "../../../assets/delete.png";
import { useState } from 'react'


export default function CalendarItem({ index, name, desc, isActive, elKey }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    
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