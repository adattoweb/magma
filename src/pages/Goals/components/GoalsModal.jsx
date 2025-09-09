import { motion, AnimatePresence } from "framer-motion"
import Modal from "@/components/Modal/Modal";
import deleteItem from "../helpers/deleteItem";

export default function GoalsModal({ isOpen, isEn, setIsOpen, error, newName, setNewName, newCounter, setNewCounter, mode, updateMode, localKey, setArray, saveChanges }){
    const isDark = localStorage.getItem("settings-theme") === "dark"
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="gmodal">
            <h3>{isEn ? "Habit editing" : "Редагування звички"}</h3>
            <div className="gmodal__inputs">
                <div className="gmodal__input">
                    <label htmlFor="mname">{isEn ? "Name" : "Назва"}</label>
                    <input type="text" maxLength="30" className="gmodal__name" id="mname" style={{border: error ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} value={newName} onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div className="gmodal__input">
                    <label htmlFor="mtimes">{isEn ? "Counter" : "Лічильник"}</label>
                    <input type="text" maxLength="5" className="gmodal__times" id="mtimes" value={newCounter} onChange={(e) => setNewCounter(e.target.value)}/>
                </div>
            </div>
            <div className="gmodal__reset">
                <p>{isEn ? "Reset Counter" : "Очищати лічильник"}</p>
                <div className="greset">
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className={`greset__item${mode === 0 ? " active" : ""}`} onClick={() => updateMode(0)}>{isEn ? "Daily" : "Щодня"}</motion.div>
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className={`greset__item${mode === 1 ? " active" : ""}`} onClick={() => updateMode(1)}>{isEn ? "Weekly" : "Щотиждень"}</motion.div>
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className={`greset__item${mode === 2 ? " active" : ""}`} onClick={() => updateMode(2)}>{isEn ? "Monthly" : "Щомісяця"}</motion.div>
                </div>
            </div>
            <div className="gmodal__buttons">
                <motion.div whileHover={{scale: 1.05}} className="gmodal__delete" onClick={() => deleteItem(localKey, setArray)}>{isEn ? "Delete" : "Видалити"}</motion.div>
                <motion.div whileHover={{scale: 1.05}} className="gmodal__save" onClick={saveChanges}>{isEn ? "Save" : "Зберегти"}</motion.div>
            </div>
        </div>
        <AnimatePresence>
            {error.length > 0 && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="gmodal__error">{error}</motion.div>}
        </AnimatePresence>
    </Modal>
    )
}