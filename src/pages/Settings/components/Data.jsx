import { useState, useRef } from "react"

export default function Data({ onChange }){
    const isEn = localStorage.getItem("settings-lang") === "en";
    function Button({ children, func, after, isDangerous}){
        const [isApproved, setIsApproved] = useState(false)
        const isAfter = useRef(false)
        return (
            <div className="data__button" onClick={() => {
                setIsApproved(!isApproved)
                if(isApproved && !isAfter.current && isDangerous) {
                    isAfter.current = true
                    func()
                }
                if(!isDangerous && !isAfter.current) {
                    func()
                }
                if(!isDangerous) {
                    isAfter.current = !isAfter.current
                }
            }}>{isDangerous ? isAfter.current ? after : !isApproved ? children : (isEn ? "Are you sure?" : "Ви впевнені?") : isApproved ? after : children}</div>
        )
    }
    function clearLocalStorage(){
        Object.keys(localStorage).map(key => {
            if(localStorage.getItem(key).includes("undefined") || key.includes("undefined")) localStorage.removeItem(key)
        })
    }
    function deleteLocalStorage(){
        const lang = localStorage.getItem("settings-lang")
        localStorage.clear()
        localStorage.setItem("settings-lang", lang)
    }
    return (
        <div className="data">
            <h4>{isEn ? "Delete all data" : "Видалити усі дані"}</h4>
            <p>{isEn 
                ? "The entire calendar, all trackers, all settings, and history will be deleted." 
                : "Весь календар, усі трекери, всі налаштування, вся історія буде видалена"}
            </p>
            <Button func={deleteLocalStorage} after={isEn ? "Deleted" : "Видалено"} isDangerous={true}>
                {isEn ? "Delete" : "Видалити"}
            </Button>
            <h4>{isEn ? "Clear potentially faulty data" : "Очистити дані з можливими помилками"}</h4>
            <p>{isEn 
                ? "Some data that may theoretically contain errors will be deleted." 
                : "Певні дані, які теорітично можуть містити помилки, будуть видалені."}
            </p>
            <p>{isEn 
                ? "This helps reduce the number of errors but may remove some data, such as tasks in the calendar, etc." 
                : "Це сприяє зменшенню кількості помилок, але може видалити певні дані, будь то задачі в календарі, тощо."}
            </p>
            <Button func={clearLocalStorage} after={isEn ? "Cleared" : "Очищено"} isDangerous={true}>
                {isEn ? "Clear" : "Очистити"}
            </Button>
            <Button func={onChange} after={isEn ? "Refreshed" : "Оновлено"} isDangerous={false}>
                {isEn ? "Refresh the page" : "Оновити сторінку"}
            </Button>
        </div>
    )
}
