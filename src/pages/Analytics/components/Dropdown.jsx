import { useState } from "react";
import Dropdown from "@/components/Dropdown/Dropdown";


export default function AnalyticsDropdown({changeProject, startValue}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
    if(startValue === undefined) startValue = array[0];
    array.unshift("Всі");
    const [select, setSelect] = useState(startValue);
    return (
        <Dropdown name={select}>
            {array.map((el, index) => <p onClick={() => {
                setSelect(el);
                changeProject !== undefined && changeProject(el);
            }} key={el + index}>{el === "Всі" && isEn ? "All" : el === "Без проєкту" && isEn ? "Without project" : el}</p>)}
        </Dropdown>
    );
}