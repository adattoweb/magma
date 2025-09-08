import { motion, AnimatePresence } from "framer-motion"
import Modal from "@/components/Modal/Modal";

export default function TrackerModal({ isOpen, setIsOpen, isEn, error, name, setName, url, setUrl, addTheme, errorRef }){
    const isDark = localStorage.getItem("settings-theme") === "dark"

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="tmodal">
            <div className="tmodal__inputs">
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Name" : "Назва"}</label>
                    <input placeholder="Theme 0" type="text" maxLength="15" className="tmodal__name" id="name" style={{border: error && errorRef.current === 1 ?  "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="tmodal__input">
                    <label htmlFor="tname">{isEn ? "Image URL" : "Посилання на зображення"}</label>
                    <input placeholder="https://images.unsplash.com/photo-1627797427417-ef69f1c4705b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" type="text" className="tmodal__name" id="url" style={{border: error && errorRef.current === 2 ?  "1px solid #c52d2d" : isDark ? "1px solid #353535" : "1px solid #bababa"}} value={url} onChange={(e) => setUrl(e.target.value)}/>
                </div>
            </div>
            <div className="gmodal__buttons">
                <motion.div whileHover={{scale: 1.05}} className="tmodal__save" onClick={addTheme}>{isEn ? "Create" : "Створити"}</motion.div>
            </div>
        </div>
        <AnimatePresence>
            {error.length > 0 && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="modal__error">{error}</motion.div>}
        </AnimatePresence>
    </Modal>
    )
}