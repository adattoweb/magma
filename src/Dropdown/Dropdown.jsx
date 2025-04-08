import {useState} from "react";
import styles from './Dropdown.module.css'
import triangle from "../assets/triangle.png";


export default function Dropdown({changeProject, startValue, editProject}) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
    if(startValue === undefined) startValue = array[0];

    const [isRotate, setIsRotate] = useState(false);
    const [select, setSelect] = useState(startValue);
    return (
        <div className={styles['dropdown']} onMouseOver={() => setIsRotate(true)} onMouseOut={() => setIsRotate(false)}>
            <button className={styles['dropdown-btn']}>{isEn && select === "Без проєкту" ? "Without project" : select} <img className={isRotate ? "rotate" : ""} src={triangle} /></button>
            <div className={styles['dropdown-content']}>
                {array.map((el, index) => <p onClick={() => {
                    setSelect(el);
                    changeProject !== undefined && changeProject(el);
                    editProject !== undefined && editProject(el);
                }} key={el + index}>{isEn && el === "Без проєкту" ? "Without project" : el}</p>)}
            </div>
        </div>
    );
}