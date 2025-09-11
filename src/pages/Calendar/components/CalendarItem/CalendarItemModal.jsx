import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getCalendar from "../../helpers/getCalendar";
import { enGB, uk } from "date-fns/locale";

registerLocale("en-GB", enGB);
registerLocale("uk", uk);

export default function CalendarItemModal({ isOpen, setIsOpen, calendar, setCalendar, elKey, name, desc, priority, taskDate, indexPos }){
        const isDark = localStorage.getItem("settings-theme") === "dark"
        const isEn = localStorage.getItem("settings-lang") === "en"

        const localArray = localStorage.getItem(elKey).split("^")

        const [error, setError] = useState(false)
        const [newName, setNewName] = useState(name)
        const [newDesc, setNewDesc] = useState(desc)
        const [date, setDate] = useState(new Date(+localArray[2], +localArray[3]-1, +localArray[4]))
        const [choosed, setChoosed] = useState(priority)
    
        function saveChanges(){
            if(newName.includes("^") || newDesc.includes("^")) {
                setError(isEn ? "Remove the '^' character." : "Приберіть '^' символ.")
                if(!error){
                    setTimeout(() => {
                        setError(false)
                    }, 6000)
                }
                return
            }
            if(newName.length === 0) {
                setError(isEn ? "Enter the field" : "Заповніть поле")
                if(!error){
                    setTimeout(() => {
                        setError(false)
                    }, 6000)
                }
                return
            }
            const newTaskDate = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
            const array = calendar[newTaskDate]

            let position = indexPos
            if(newTaskDate !== taskDate && array !== undefined && array.length !== 0){
                let max = 0;
                for(let i = 0; i < array.length; i++){
                    let localPos = +localStorage.getItem(array[i]).split("^")[7]
                    if(localPos > max) max = localPos
                }
                position = max + 1
            }
    
            setIsOpen(false)
    
            localStorage.setItem(elKey, `${newName}^${newDesc}^${date.getFullYear()}^${date.getMonth()+1}^${date.getDate()}^false^0^${position}^${choosed}`)
            setCalendar(getCalendar())
        }

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
    function remove(){
        const newCalendar = {...calendar}
        console.log(taskDate)
        newCalendar[taskDate] = newCalendar[taskDate].filter(el => el !== elKey)
        localStorage.removeItem(elKey)
        setCalendar(newCalendar)
        setIsOpen(false)
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="calendarmodal">
        <div className="tmodal">
            <h3>{isEn ? "Task editing" : "Редагування задачі"}</h3>
            <div className="tmodal__inputs">
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Name" : "Назва"}</label>
                    <input type="text" maxLength="30" className="tmodal__name" id="tname" style={{border: error ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} value={newName} onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Description" : "Опис"}</label>
                    <textarea type="text" maxLength="60" className="tmodal__name" id="tname" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}/>
                </div>
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Date" : "Дата"}</label>
                    <DatePicker className="tmodal__name" selected={date} onChange={(date) => setDate(date)} locale={isEn ? "en-GB" : "uk"} dateFormat={"dd.MM.yyyy"}/>
                </div>
                <div className="tmodal__input">
                    <ModalPriorities/>
                </div>
            </div>
            <div className="gmodal__buttons">
                <motion.div whileHover={{scale: 1.05}} className="tmodal__delete" onClick={remove}>{isEn ? "Delete" : "Видалити"}</motion.div>
                <motion.div whileHover={{scale: 1.05}} className="tmodal__save" onClick={saveChanges}>{isEn ? "Save" : "Зберегти"}</motion.div>
            </div>
        </div>
        <AnimatePresence>
            {error.length > 0 && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="modal__error">{error}</motion.div>}
        </AnimatePresence>
    </Modal>
    )
}