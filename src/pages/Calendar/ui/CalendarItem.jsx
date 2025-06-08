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
            }}>
                {newIsActive && (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
  <g transform="scale(2) translate(-6, -6)">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
      fill="currentColor"
    />
  </g>
    </svg>
  )}
            </div>
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