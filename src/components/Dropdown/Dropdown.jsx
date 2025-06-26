import { useState } from "react";
import './Dropdown.css'
import triangle from "@/assets/triangle.png";


export default function Dropdown({changeProject, startValue, editProject}) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
    if(startValue === undefined) startValue = array[0];

    const [isOpen, setIsOpen] = useState(false);
    const [select, setSelect] = useState(startValue);
    return (
        <div className='dropdown' onClick={() => setIsOpen(!isOpen)}>
            <button className='dropdown-btn'><p>{isEn && select === "Без проєкту" ? "Without project" : select}</p><img draggable={false} className={isOpen ? 'rotate' : ""} src={triangle} /></button>
            {isOpen && <div className='dropdown-content'>
                {array.map((el, index) => <p onClick={() => {
                    setSelect(el);
                    changeProject !== undefined && changeProject(el);
                    editProject !== undefined && editProject(el);
                }} key={el + index}>{isEn && el === "Без проєкту" ? "Without project" : el}</p>)}
            </div>}
        </div>
    );
}