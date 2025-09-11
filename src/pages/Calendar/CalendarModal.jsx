import { motion, AnimatePresence } from "framer-motion"
import Modal from "@/components/Modal/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarModal({ isOpen, setIsOpen, error, name, setName, saveChanges, date, setDate, choosed, setChoosed, desc, setDesc}){
    const isDark = localStorage.getItem("settings-theme") === "dark"
    const isEn = localStorage.getItem("settings-lang") === "en"

    function ModalPriorities(){
        const priorities = ["gray", "blue", "yellow", "red"]
    
        function Checkbox({ value, name }){
            return (
                <div className={`priorities__checkbox ${choosed === value && "active"} ${name}`} onClick={() => setChoosed(value)}/>
            )
        }
    
        return (
            <div className="calendarmenu__item priorities">
                <label htmlFor="tname">{isEn ? "Priority" : "Пріоритет"}</label>
                <div className="priorities__list">
                    {priorities.reverse().map((el, index) => <Checkbox key={index} value={priorities.length - 1 - index} name={el}/>)}
                </div>
            </div>
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="tmodal">
            <h3>{isEn ? "Task creating" : "Створення задачі"}</h3>
            <div className="tmodal__inputs">
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Name" : "Назва"}</label>
                    <input type="text" maxLength="30" className="tmodal__name" id="tname" style={{border: error ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Description" : "Опис"}</label>
                    <input type="text" maxLength="30" className="tmodal__name" id="tname" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                </div>
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Date" : "Дата"}</label>
                    <DatePicker className="tmodal__name" selected={date} onChange={(date) => setDate(date)}/>
                </div>
            </div>
            <ModalPriorities/>
            <div className="gmodal__buttons">
                <motion.div whileHover={{scale: 1.05}} className="tmodal__save" onClick={saveChanges}>{isEn ? "Create" : "Створити"}</motion.div>
            </div>
        </div>
        <AnimatePresence>
            {error.length > 0 && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="modal__error">{error}</motion.div>}
        </AnimatePresence>
    </Modal>
    )
}