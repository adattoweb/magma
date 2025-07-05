import deleteImg from "@/assets/delete.png"
import copy from "@/assets/copy.png"
import ModalPriorities from "./ModalPriorities";

import { useEffect, useRef } from "react";

export default function ModalMenu({ elKey, onChange, rect, keyArr, calendar, setCalendar, setActiveMenu, menuBtnRef }){
    const isEn = localStorage.getItem("settings-lang") === "en";

    const modalRef = useRef()

    useEffect(() => {
        function handleClickOutside(e) {
          if (modalRef.current && menuBtnRef.current && !modalRef.current.contains(e.target) && !menuBtnRef.current.contains(e.target)) {
            setActiveMenu(null)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    function findTaskDate(id){
        for(let key in calendar){
          if(calendar[key].some(el => el === id)) return key
        }
        throw new Error("The task was not found.")
    }

    const dayDate = findTaskDate(elKey)

    function remove(){
        const newCalendar = {...calendar}
        console.log(dayDate)
        newCalendar[dayDate] = newCalendar[dayDate].filter(el => el !== elKey)
        localStorage.removeItem(elKey)
        setCalendar(newCalendar)
    }
    function duplicate(){
        let array = localStorage.getItem(elKey).split("^")
        let newTaskIndex = +localStorage.getItem("calendar-index")
        localStorage.setItem("calendar-index", newTaskIndex+1)
        const key = `calendar-item-${newTaskIndex}`
        localStorage.setItem(key, `${array[0]}^${array[1]}^${array[2]}^${array[3]}^${array[4]}^${array[5]}^${array[6]}^${keyArr.length}^${array[8]}`)
        
        const newCalendar = {...calendar}
        newCalendar[dayDate].push(key)
        setCalendar(newCalendar)
    }
    function MenuItem({ children, onClick, image }){
        return (
            <div onClick={onClick} className="calendarmenu__item"><img src={image}/><p>{children}</p></div>
        )
    }
    console.log(elKey)
    return (
        <div ref={modalRef} className="calendarmenu newblock" style={{left: rect.x - 20, top: rect.y + 20}}>
            <MenuItem onClick={remove} image={deleteImg}>{isEn ? "Delete" : "Видалити"}</MenuItem>
            <MenuItem onClick={duplicate} image={copy}>{isEn ? "Duplicate" : "Дублювати"}</MenuItem>
            <ModalPriorities elKey={elKey} onChange={onChange}/>
        </div>
    )
}