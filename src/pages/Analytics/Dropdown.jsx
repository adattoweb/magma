import { useState } from "react";
import styles from '../../components/Dropdown/Dropdown.module.css'
import triangle from "../../assets/triangle.png";


export default function Dropdown({changeProject, startValue}) {
    const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
    if(startValue === undefined) startValue = array[0];
    array.unshift("Всі");
    const [isRotate, setIsRotate] = useState(false);
    const [select, setSelect] = useState(startValue);
    return (
        <div className={styles['dropdown']} onMouseOver={() => setIsRotate(true)} onMouseOut={() => setIsRotate(false)}>
            <button className={styles['dropdown-btn']}>{select} <img className={isRotate ? styles['rotate'] : ""} src={triangle} /></button>
            <div className={styles['dropdown-content']}>
                {array.map((el, index) => <p onClick={() => {
                    setSelect(el);
                    changeProject !== undefined && changeProject(el);
                }} key={el + index}>{el}</p>)}
            </div>
        </div>
    );
}