import { useState } from "react";
import '@/components/Dropdown/Dropdown.css'
import triangle from "@/assets/triangle.png";


export default function Dropdown({changeProject, startValue}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
    if(startValue === undefined) startValue = array[0];
    array.unshift("Всі");
    const [isOpen, setIsOpen] = useState(false);
    const [select, setSelect] = useState(startValue);
    return (
        <div className='dropdown' onClick={() => setIsOpen(!isOpen)}>
            <button className='dropdown-btn'>{select === "Всі" && isEn ? "All" : select === "Без проєкту" && isEn ? "Without project" : select} <img className={isOpen ? 'rotate' : ""} src={triangle} /></button>
            {isOpen && <div className='dropdown-content'>
                {array.map((el, index) => <p onClick={() => {
                    setSelect(el);
                    changeProject !== undefined && changeProject(el);
                }} key={el + index}>{el === "Всі" && isEn ? "All" : el === "Без проєкту" && isEn ? "Without project" : el}</p>)}
            </div>}
        </div>
    );
}