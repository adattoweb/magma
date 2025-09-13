import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getCalendar from "./helpers/getCalendar";
import { enGB, uk } from "date-fns/locale";

registerLocale("en-GB", enGB);
registerLocale("uk", uk);

export default function CalendarModal({ isOpen, setIsOpen, calendar, setCalendar, startDate}){
        const isDark = localStorage.getItem("settings-theme") === "dark"
        const isEn = localStorage.getItem("settings-lang") === "en"

        const [error, setError] = useState(false)
        const [name, setName] = useState("")
        const [desc, setDesc] = useState("")
        const [date, setDate] = useState(startDate)
        const [choosed, setChoosed] = useState(0)
    
        function saveChanges(){
            if(name.includes("^") || desc.includes("^")) {
                setError(isEn ? "Remove the '^' character." : "Приберіть '^' символ.")
                if(!error){
                    setTimeout(() => {
                        setError(false)
                    }, 6000)
                }
                return
            }
            if(name.length === 0) {
                setError(isEn ? "Enter the field" : "Заповніть поле")
                if(!error){
                    setTimeout(() => {
                        setError(false)
                    }, 6000)
                }
                return
            }
            const localIndex = +localStorage.getItem("calendar-index")
            const array = calendar[`${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`]
            let position = 0
            if(array !== undefined && array.length !== 0){
                let max = 0;
                for(let i = 0; i < array.length; i++){
                    let localPos = +localStorage.getItem(array[i]).split("^")[7]
                    if(localPos > max) max = localPos
                }
                position = max + 1
            }
    
            setName("")
            setDesc("")
            setChoosed(0)
            setDate(startDate)
            setIsOpen(false)
    
            localStorage.setItem("calendar-index", localIndex+1)
            localStorage.setItem(`calendar-item-${localIndex}`, `${name}^${desc}^${date.getFullYear()}^${date.getMonth()+1}^${date.getDate()}^false^0^${position}^${choosed}`)
            setCalendar(getCalendar(startDate))
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

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="calendarmodal">
        <div className="tmodal">
            <h3>{isEn ? "Task creating" : "Створення задачі"}</h3>
            <div className="tmodal__inputs">
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Name" : "Назва"}</label>
                    <input type="text" maxLength="30" className="tmodal__name" id="tname" style={{border: error ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Description" : "Опис"}</label>
                    <textarea type="text" maxLength="60" className="tmodal__name" id="tname" value={desc} onChange={(e) => setDesc(e.target.value)}/>
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
                <motion.div whileHover={{scale: 1.05}} className="tmodal__save" onClick={saveChanges}>{isEn ? "Create" : "Створити"}</motion.div>
            </div>
        </div>
        <AnimatePresence>
            {error.length > 0 && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="modal__error">{error}</motion.div>}
        </AnimatePresence>
    </Modal>
    )
}