import {useState} from "react";
import triangle from "../assets/triangle.png";


export default function Dropdown({changeProject, startValue}) {
    const [isRotate, setIsRotate] = useState(false);
    const [select, setSelect] = useState(startValue);
    let array = ["7", "14"];
    return (
        <div className="dropdown" onMouseOver={() => setIsRotate(true)} onMouseOut={() => setIsRotate(false)}>
            <button className="dropdown-btn">{select} <img className={isRotate ? "rotate" : ""} src={triangle} /></button>
            <div className="dropdown-content">
                {array.map((el, index) => <p onClick={() => {
                    setSelect(el);
                    changeProject !== undefined && changeProject(el);
                }} key={el + index}>{el}</p>)}
            </div>
        </div>
    );
}