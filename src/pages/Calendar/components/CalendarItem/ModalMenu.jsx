import React from "react";
import deleteImg from "../../../../assets/delete.png"

const ModalMenu = React.memo(function ModalMenu({ setIsDisplay, index, rect })  {
    console.log("ModalMenu render")
    console.log(rect)

    function deleteFunc(){
        localStorage.removeItem(`calendar-item-${index}`);
        setIsDisplay(false);
    }
    const isEn = localStorage.getItem("settings-lang") === "en";
    function MenuItem({ children, onClick, image }){
        return (
            <div onClick={onClick} className="calendarmenu__item"><img src={image}/><p>{children}</p></div>
        )
    }
    return (
        <div className="calendarmenu newblock" style={{left: rect.x - 20, top: rect.y + 20}}>
            <MenuItem onClick={deleteFunc} image={deleteImg}>{isEn ? "Delete" : "Видалити"}</MenuItem>
        </div>
    )
})

export default ModalMenu