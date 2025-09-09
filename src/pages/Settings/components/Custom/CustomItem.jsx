import Modal from "@/components/Modal/Modal"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

export default function CustomItem({name, src, setArray, onChange}) {
    const isEn = localStorage.getItem("settings-lang") === "en"
    const isDark = localStorage.getItem("settings-theme") === "dark"

    const [isOpen, setIsOpen] = useState(false)

    const [newName, setNewName] = useState(name)
    const [newSrc, setNewSrc] = useState(src)

    const localThemes = localStorage.getItem("custom-themes").split("^")
    const array = [...localThemes].map(e => e.split("@"))
    const arrayNames = []
    for(let i = 0; i < array.length; i++){
        arrayNames.push(array[i][0].toLowerCase())
    }

    function ItemModal() {
        const errorRef = useRef(0)
        const [error, setError] = useState(false)
        function saveChanges(modalName, modalSrc){
            if((modalName.length === 0 || arrayNames.includes(modalName.toLowerCase())) && modalName !== newName){
                if(!error){
                    setError(isEn ? "A unique name is required" : "Назва повинна бути унікальною")
                    setTimeout(() => {
                        setError(false)
                    }, 6000)
                }
                errorRef.current = 1
                return
            }
            if(!/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i.test(modalSrc)){
                if(!error){
                    setError(isEn ? "Invalid URL" : "Неправильне посилання")
                    setTimeout(() => {
                        setError(false)
                    }, 6000)
                }
                errorRef.current = 2
                return
            }
            const array = localStorage.getItem("custom-themes").split("^").map(el => el.split("@"))
            for(let i = 0; i < array.length; i++){
                if(newName === array[i][0]){
                    array[i][0] = modalName
                    array[i][1] = modalSrc
                }
            }
            localStorage.setItem("custom-themes", array.map(el => el.join("@")).join("^"))
            // якщо все ок
            setNewName(modalName)
            setNewSrc(modalSrc)
            setIsOpen(false)
        }
        function deleteFunc(){
            const array = localStorage.getItem("custom-themes").split("^").map(el => el.split("@"))
            console.log(array)
            for(let i = 0; i < array.length; i++){
                if(newName === array[i][0]){
                    array.splice(i, 1)
                    break;
                }
            }
            localStorage.setItem("custom-themes", array.map(el => el.join("@")).join("^"))
            setArray(array)
            setIsOpen(false)
        }
        function setActive(){
            localStorage.setItem("custom-choosed", newName)
            setIsOpen(false)
            onChange()
            location.href="/"
        }
        const [modalName, setModalName] = useState(newName)
        const [modalSrc, setModalSrc] = useState(newSrc)
        return (
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="tmodal">
                    <h3>{isEn ? "Edit theme" : "Редагування теми"}</h3>
                    <div className="tmodal__inputs">
                        <div className="tmodal__input">
                            <label htmlFor="tname">{isEn ? "Name" : "Назва"}</label>
                            <input placeholder="Theme 0" type="text" maxLength="15" className="tmodal__name" id="name" style={{ border: error && errorRef.current === 1 ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa" }} value={modalName} onChange={(e) => setModalName(e.target.value)} />
                        </div>
                        <div className="tmodal__input">
                            <label htmlFor="tname">{isEn ? "Image URL" : "Посилання на зображення"}</label>
                            <input placeholder="https://images.unsplash.com/photo-1627797427417-ef69f1c4705b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" type="text" className="tmodal__name" id="url" style={{ border: error && errorRef.current === 2 ? "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa" }} value={modalSrc} onChange={(e) => setModalSrc(e.target.value)} />
                        </div>
                    </div>
                    <div className="gmodal__buttons">
                        <motion.div whileHover={{ scale: 1.05 }} className="tmodal__delete" onClick={deleteFunc}>{isEn ? "Delete" : "Видалити"}</motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="tmodal__save" onClick={() => saveChanges(modalName, modalSrc)}>{isEn ? "Save" : "Зберегти"}</motion.div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} className="tmodal__save settheme" onClick={setActive}>{isEn ? "Activate" : "Активувати"}</motion.div>
                </div>
                <AnimatePresence>
                    {error.length > 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal__error">{error}</motion.div>}
                </AnimatePresence>
            </Modal>
        )
    }
return (
    <>
    <ItemModal/>
    <div className="backitem newblock" onClick={() => {setIsOpen(true)}}>
        <img draggable={false} src={src} />
        <div className="backitem__footer">
            <p>{newName}</p>
        </div>
    </div>
    </>
    )
}

// <ItemModal newName = {newName} newSrc = {newSrc} isOpen = {isOpen} setIsOpen = {setIsOpen} isEn = {isEn} isDark = {isDark} error = {error} errorRef = {errorRef} saveChanges = {saveChanges}/>