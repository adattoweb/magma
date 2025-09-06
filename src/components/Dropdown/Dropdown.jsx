import { motion, AnimatePresence } from "framer-motion"

import { useState } from "react";
import triangle from "@/assets/triangle.png";
import './Dropdown.css'


export default function Dropdown({name, children}) {
    // const isEn = localStorage.getItem("settings-lang") === "en";

    // const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
    // if(startValue === undefined) startValue = array[0];
    // const [select, setSelect] = useState(startValue);
    // {isEn && select === "Без проєкту" ? "Without project" : select}

    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} className={`dropdown${isOpen ? " open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <button className="dropdown-btn"><p>{name}</p><img draggable={false} className={isOpen ? 'rotate' : ""} src={triangle} /></button>
            <AnimatePresence mode="wait">
                {isOpen && <motion.div initial={{opacity: 0, scale: 0.7}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.7}} className='dropdown-content'>
                    {children}
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
}
// {array.map((el, index) => <p onClick={() => {
//     setSelect(el);
//     changeProject !== undefined && changeProject(el);
//     editProject !== undefined && editProject(el);
// }} key={el + index}>{isEn && el === "Без проєкту" ? "Without project" : el}</p>)}