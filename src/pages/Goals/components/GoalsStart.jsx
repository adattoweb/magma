import { useState } from "react";
import { motion } from "framer-motion"

import addItem from "../helpers/addItem";

export default function GoalsStart({ setArray }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState("");

    function onClick(){
        if(name.length === 0) return
        addItem(name, setArray)
        setName("")
    }

    function StartButton(){
        return (
            <motion.div layout className="gstart__button" whileTap={{scale: 0.95}} onClick={onClick}>{isEn ? "Create" : "Створити"}</motion.div>
        )
    }
    
    return (
        <div className="goals__add trackers__add project__add newblock">
            <div className="trackers__info">
                <input type="text" className="tstart__input" maxLength={30} placeholder={isEn ? "Add a habit" : "Введіть звичку"} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="trackers__start">
                <StartButton/>
            </div>
        </div>
    );
}