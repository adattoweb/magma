import { useState } from "react";
import triangle from "../assets/triangle.png";
import '../../../components/Dropdown/Dropdown.css'


export default function Dropdown({ changeProject, startValue }) {
    const [isOpen, setIsOpen] = useState(false);
    const [select, setSelect] = useState(startValue);
    let array = ["7", "14"];
    return (
        <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
            <button className="dropdown-btn">{select} <img className={isOpen ? "rotate" : ""} src={triangle} /></button>
            {isOpen && <div className="dropdown-content">
                {array.map((el, index) => <p onClick={() => {
                    setSelect(el);
                    changeProject !== undefined && changeProject(el);
                }} key={el + index}>{el}</p>)}
            </div>}
        </div>
    );
}