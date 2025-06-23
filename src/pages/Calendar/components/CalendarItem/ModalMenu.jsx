import React from "react";
import deleteImg from "../../../../assets/delete.png"
import ModalPriorities from "./ModalPriorities";

const ModalMenu = React.memo(function ModalMenu({ elKey, setIsDisplay, index, rect, onChange })  {
    const isEn = localStorage.getItem("settings-lang") === "en";
    console.log("ModalMenu render")
    console.log(rect)

    function deleteFunc(){
        localStorage.removeItem(`calendar-item-${index}`);
        setIsDisplay(false);
    }
    function MenuItem({ children, onClick, image }){
        return (
            <div onClick={onClick} className="calendarmenu__item"><img src={image}/><p>{children}</p></div>
        )
    }
    return (
        <div className="calendarmenu newblock" style={{left: rect.x - 20, top: rect.y + 20}}>
            <MenuItem onClick={deleteFunc} image={deleteImg}>{isEn ? "Delete" : "Видалити"}</MenuItem>
            <ModalPriorities elKey={elKey} onChange={onChange}/>
        </div>
    )
})

export default ModalMenu