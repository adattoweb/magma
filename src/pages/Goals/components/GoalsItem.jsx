import { useState, useEffect } from "react";
import { motion } from "framer-motion"

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import editProperty from "../helpers/editProperty";
import GoalsModal from "./GoalsModal";


export default function GoalsItem({ localKey, setArray, active, isDraggable }) {
    if(localStorage.getItem(localKey) === null) return
    const index = localKey.split("-")[2]
    const array = localStorage.getItem(localKey).split("^")
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState(array[0]);
    const [counter, setCounter] = useState(+array[1])
    const [mode, setMode] = useState(+array[3]) // 0 - щодня, 1 - щотиждня, 2 - щомісяця

    let date = +array[2]
    const now = new Date().getTime()
    // console.log(now - 60 * 60 * 24 * 1000, (now - date) / 1000 / 24 / 60 / 60)
    if((mode === 0 && (now - date > 60 * 60 * 24 * 1000)) || (mode === 1 && now - date > (60 * 60 * 24 * 7 * 1000)) || (mode === 2 && now - date > (60 * 60 * 24 * 30 * 1000))){
        editProperty(localKey, name, 0, new Date().getTime(), mode)
        setCounter(0)
        console.log("+")
        console.log(date, now, mode)
    } // ***


    const [isOpen, setIsOpen] = useState(false)

    const [newName, setNewName] = useState(name)
    const [newCounter, setNewCounter] = useState(counter)

    useEffect(() => {
        setNewCounter(counter)
    }, [counter])

    const [error, setError] = useState(false)

    function saveChanges(){
        let hasError = false
        if(newName.length === 0) {
            setError(isEn ? "Minimum string length: 1 character" : "Мінімальна довжина строки: 1 символ")
            hasError = true
        }
        if(newName.length > 30){
            setError(isEn ? "Maximum string length: 30 characters" : "Максимальна довжина строки: 30 символів")
            hasError = true
        }
        if(hasError){
            if(error) return
            setTimeout(() => {
                setError(false)
            }, 10000)
            return
        }
        setName(newName)
        setCounter(+newCounter)
        setIsOpen(false)
        editProperty(localKey, newName, +newCounter, date, mode)
    }

    function updateMode(mode){
        editProperty(localKey, name, counter, now, mode)
        date = now
        setMode(mode)
    }

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: index})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <>
            <GoalsModal isOpen={isOpen} isEn={isEn} setIsOpen={setIsOpen} error={error} newName={newName} setNewName={setNewName} 
            newCounter={newCounter} setNewCounter={setNewCounter} mode={mode} updateMode={updateMode} localKey={localKey} setArray={setArray} saveChanges={saveChanges} />
            <motion.div className={`gitem ${isDraggable ? "newblock" : +index === +active ? "gitem-dragging" : ""}`} onClick={() => setIsOpen(true)} {...listeners} {...attributes} style={style} ref={setNodeRef}>
                <div className="gitem__edit">
                    <p className="gitem__name">{name}</p>
                </div>
                <div className="gitem__info">
                    {counter}
                </div>
                <div className="gitem__actions">
                    <motion.div whileHover={{ background: "#151515" }} className="gitem__action" onClick={(e) => { e.stopPropagation(); editProperty(localKey, name, +counter + 1, date, mode); setCounter(+counter + 1) }}>+</motion.div>
                    <motion.div whileHover={{ background: "#151515" }} className="gitem__action" onClick={(e) => { e.stopPropagation(); editProperty(localKey, name, +counter - 1, date, mode); setCounter(+counter - 1) }}></motion.div>
                </div>
            </motion.div >
        </>
    );
}   
// () => deleteItem(index, localList, setArray)