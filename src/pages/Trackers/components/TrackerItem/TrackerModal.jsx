import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "@/components/Modal/Modal";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function TrackerModal({ isOpen, isEn, setIsOpen, error, newName, setNewName, newProject, setNewProject, newStart, setNewStart, newEnd, setNewEnd, saveChanges, deleteFunction, editItem, errorRef }){
    const isDark = localStorage.getItem("settings-theme") === "dark"

    const localProjects = localStorage.getItem("tracker-projects")
    const array = localProjects === null ? [] : localProjects.split("^")
    const [select, setSelect] = useState(newProject)

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="tmodal">
            <div className="tmodal__inputs">
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Name" : "Назва"}</label>
                    <input type="text" maxLength="30" className="tmodal__name" id="tname" style={{border: error && errorRef.current === 1 ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} value={newName} onChange={(e) => setNewName(e.target.value)}/>
                    <Dropdown name={select}>
                        {array.map((el, index) => <p onClick={() => {
                            setSelect(el);
                            setNewProject(el)
                            editItem(newName, el)
                        }} key={el + index}>{isEn && el === "Без проєкту" ? "Without project" : el}</p>)}
                    </Dropdown>
                </div>
                <div className="tmodaltime">
                    <p>{isEn ? "Time" : "Час"}</p>
                    <div className="tmodaltime__inputs">
                        <input type="text" placeholder="12:00" maxLength={5} value={newStart} style={{border: error && errorRef.current === 2 ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} onChange={(e) => setNewStart(e.target.value)} />
                        <input type="text" placeholder="12:30" maxLength={5} value={newEnd} style={{border: error && errorRef.current === 3 ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} onChange={(e) => setNewEnd(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="gmodal__buttons">
                <motion.div whileHover={{scale: 1.05}} className="tmodal__delete" onClick={deleteFunction}>{isEn ? "Delete" : "Видалити"}</motion.div>
                <motion.div whileHover={{scale: 1.05}} className="tmodal__save" onClick={saveChanges}>{isEn ? "Save" : "Зберегти"}</motion.div>
            </div>
        </div>
        <AnimatePresence>
            {error.length > 0 && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="modal__error">{error}</motion.div>}
        </AnimatePresence>
    </Modal>
    )
}