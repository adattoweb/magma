import { useState } from 'react'

export default function ModalPriorities({ elKey, onChange }){
    const isEn = localStorage.getItem("settings-lang") === "en";

    const array = localStorage.getItem(elKey).split("^")
    const localPriority = +array[8]

    const [choosed, setChoosed] = useState(+localPriority) // буде приходити значення з localStorage

    const priorities = ["gray", "blue", "yellow", "red"]

    function editPriority(newValue){
        localStorage.setItem(elKey, `${array[0]}^${array[1]}^${array[2]}^${array[3]}^${array[4]}^${array[5]}^${array[6]}^${array[7]}^${newValue}`)
        setChoosed(newValue)
        onChange()
    }

    function Checkbox({ value, name }){
        return (
            <div className={`priorities__checkbox ${choosed === value && "active"} ${name}`} onClick={() => editPriority(value)}/>
        )
    }

    return (
        <div className="calendarmenu__item priorities">
            <h4>{isEn ? "Priorities" : "Пріоритети"}</h4>
            <div className="priorities__list">
                {priorities.reverse().map((el, index) => <Checkbox key={index} value={priorities.length - 1 - index} name={el}/>)}
            </div>
        </div>
    )
}