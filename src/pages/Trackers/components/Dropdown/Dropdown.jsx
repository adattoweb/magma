import { useState } from "react";
import triangle from "@/assets/triangle.png";

import DropAdd from "./components/DropAdd";
import DropdownItem from "./components/DropdownItem";

export default function Dropdown({ project, setProject, setPage, setGlobalRender }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [isOpen, setIsOpen] = useState(false);

    function DropdownContent() {
        const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
        array.unshift(isEn ? "All" : "Всі")
        const [render, setRender] = useState(false)

        return (
            <div className='dropdown-content'>
                {array.map((el, index) => <DropdownItem key={el+index} el={el} setProject={setProject} setPage={setPage} setIsOpen={setIsOpen} setGlobalRender={setGlobalRender}/>)}
                <DropAdd makeRender={() => setRender(!render)} />
            </div>
        )
    }

    return (
        <div className='dropdown'>
            <button className='dropdown-btn' onClick={() => setIsOpen(!isOpen)}><p>{isEn && project === "Без проєкту" ? "Without project" : project}</p><img className={isOpen ? 'rotate' : ""} src={triangle} /></button>
            {isOpen && <DropdownContent />}
        </div>
    );
}