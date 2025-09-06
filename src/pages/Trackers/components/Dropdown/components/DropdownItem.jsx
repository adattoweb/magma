import deletePng from "@/assets/delete.png";
import edit from "@/assets/edit.png"
import { useState } from "react";

import editItem from "../helpers/editItem";
import deleteItem from "../helpers/deleteItem";

export default function DropdownItem({ el, setProject, setPage, setGlobalRender }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState(el)
    function selectProject() {
        setProject(name);
        setPage(0)
    }
    return (
        <div className="dropdown__item">{isEdit ? <input type="text" value={name} onClick={(e) => e.stopPropagation()} onChange={(e) => {
            setName(e.target.value)
            editItem(e.target.value, name)
        }} /> : <p onClick={selectProject}>{isEn && name === "Без проєкту" ? "Without project" : name}</p>}
            {(name !== "Без проєкту" && name !== "Without project" && name !== "All" && name !== "Всі") && <div className="dropdown__edit">
                <img src={edit} alt="edit project" onClick={(e) => {
                    e.stopPropagation()
                    if (name !== "Без проєкту" && name !== "Without project" && name !== "All" && name !== "Всі") setIsEdit(!isEdit)
                }} />
                <img src={deletePng} alt="delete project" onClick={(e) => {e.stopPropagation(); deleteItem(name, setGlobalRender)}} />
            </div>}
        </div>
    )
}