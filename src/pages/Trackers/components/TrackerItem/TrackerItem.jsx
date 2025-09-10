import { useState, useRef } from "react";
import formatTime from "@/helpers/formatTime";
import TrackerModal from "./TrackerModal";

export default function TrackerItem({ localKey, isRender, setIsRender}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const arrayValues = localStorage.getItem(localKey).split("^")
    const [name, setName] = useState(arrayValues[0])
    const [project, setProject] = useState(arrayValues[1])
    const [start, setStart] = useState(arrayValues[2])
    const [end, setEnd] = useState(arrayValues[3])
    const [all, setAll] = useState(arrayValues[4])
    console.log(arrayValues)
    const [newName, setNewName] = useState(name);
    const [newProject, setNewProject] = useState(project);
    const [newStart, setNewStart] = useState(start);
    const [newEnd, setNewEnd] = useState(end);

    function editItem(name = newName, project = newProject, start = newStart, end = newEnd, all = all) {
        localStorage.setItem(localKey, `${name}^${project}^${start}^${end}^${all}`);
    }
    const [error, setError] = useState(false)
    const errorRef = useRef(0)

    function editTime(e, isStart) {
        if (!/^(?:[01]?\d|2[0-3]):[0-5]\d$/.test(e)){
            errorRef.current = isStart ? 2 : 3
            setError(isEn ? "Invalid time format" : "Неправильний формат часу!")
            return true
        }
        if (isStart) setStart(e);
        else setEnd(e);
        let res = e.split(":");
        res[0] = res[0].padStart(2, "0");
        res[1] = res[1].padStart(2, "0");
        res = res.join(":");
        ;
        if (isStart) editItem(newName, newProject, res, end, all);
        else editItem(newName, newProject, start, res, all);
        return false
    }

    const [isOpen, setIsOpen] = useState(false)

    function deleteFunction(){
        localStorage.removeItem(localKey);
        setIsRender(!isRender);
    }

    function saveChanges(){
        let hasError = false
        if(newName.length === 0) {
            setError(isEn ? "Minimum string length: 1 character" : "Мінімальна довжина строки: 1 символ")
            errorRef.current = 1
            hasError = true
        }
        if(newName.length > 30){
            setError(isEn ? "Maximum string length: 30 characters" : "Максимальна довжина строки: 30 символів")
            errorRef.current = 1
            hasError = true
        }
        let hasStartError = editTime(newStart, true)
        let hasEndError = editTime(newEnd, false)
        if(hasError || hasStartError || hasEndError){
            if(error) return
            setTimeout(() => {
                setError(false)
            }, 10000)
            return
        }
        let startArr = newStart.split(":");
        let endArr = newEnd.split(":");
        let endTotal = +endArr[0] * 60 * 60 + +endArr[1] * 60
        if(+startArr[0] > +endArr[0]) endTotal += 24 * 3600
        let startTotal = +startArr[0] * 60 * 60 + +startArr[1] * 60
        let myAll = Math.abs(endTotal - startTotal)
        console.log(endArr, startArr)
        setName(newName)
        setProject(newProject)
        setStart(newStart)
        setEnd(newEnd)
        setIsOpen(false)
        setError(false)
        setAll(myAll)
        editItem(newName, newProject, newStart, newEnd, myAll)
    }

    return (
        <>
            <TrackerModal isOpen={isOpen} isEn={isEn} setIsOpen={setIsOpen} error={error} newName={newName} setNewName={setNewName} newProject={newProject} setNewProject={setNewProject} newStart={newStart} setNewStart={setNewStart}
            newEnd={newEnd} setNewEnd={setNewEnd} saveChanges={saveChanges} deleteFunction={deleteFunction} editItem={editItem} errorRef={errorRef}/>
            <div className="titem" onClick={() => setIsOpen(prev => !prev)}>
                <div className="titem__edit">
                    <p className="titem__name">{name}</p>
                </div>
                <div className="titem__info">
                    <div className="titem__time">
                        <p>{start}</p>
                        <p>-</p>
                        <p>{end}</p>
                    </div>
                    <div className="titem__delete">
                        <p>{formatTime(all)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}