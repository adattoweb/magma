import React from "react";
import deleteImg from "@/assets/delete.png"
import copy from "@/assets/copy.png"
import ModalPriorities from "./ModalPriorities";

const ModalMenu = React.memo(function ModalMenu({ elKey, setIsDisplay, index, rect, onChange, keyArr })  {
    const isEn = localStorage.getItem("settings-lang") === "en";
    console.log("ModalMenu render")
    console.log(rect)

    function remove(){
        localStorage.removeItem(`calendar-item-${index}`);
        setIsDisplay(false);
    }
    function duplicate(){
        let array = localStorage.getItem(elKey).split("^")
        let newTaskIndex = +localStorage.getItem("calendar-index")
        localStorage.setItem("calendar-index", newTaskIndex+1)
        localStorage.setItem(`calendar-item-${newTaskIndex}`, `${array[0]}^${array[1]}^${array[2]}^${array[3]}^${array[4]}^${array[5]}^${array[6]}^${keyArr.length}^${array[8]}`)
        onChange()
    }
    function MenuItem({ children, onClick, image }){
        return (
            <div onClick={onClick} className="calendarmenu__item"><img src={image}/><p>{children}</p></div>
        )
    }
    return (
        <div className="calendarmenu newblock" style={{left: rect.x - 20, top: rect.y + 20}}>
            <MenuItem onClick={remove} image={deleteImg}>{isEn ? "Delete" : "Видалити"}</MenuItem>
            <MenuItem onClick={duplicate} image={copy}>{isEn ? "Duplicate" : "Дублювати"}</MenuItem>
            <ModalPriorities elKey={elKey} onChange={onChange}/>
        </div>
    )
})

export default ModalMenu