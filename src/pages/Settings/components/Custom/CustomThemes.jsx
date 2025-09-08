import { useState, useRef } from "react"
import CustomModal from "./CustomModal"
import CustomItem from "./CustomItem"

import "./Custom.css"

import plus from "@/assets/plus.png"

export default function CustomThemes({ onChange }){
    if(localStorage.getItem("custom-themes") === null) localStorage.setItem("custom-themes", "Example@https://images.unsplash.com/photo-1627797427417-ef69f1c4705b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    if(localStorage.getItem("custom-choosed") === null) localStorage.setItem("custom-choosed", "not choosed")
    const localThemes = localStorage.getItem("custom-themes").split("^")
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const isEn = localStorage.getItem("settings-lang") === "en"
    const [array, setArray] = useState([...localThemes].map(e => e.split("@")))
    const arrayNames = []
    console.log(array)
    for(let i = 0; i < array.length; i++){
        arrayNames.push(array[i][0].toLowerCase())
    }
    console.log(arrayNames)
    function CustomAdd(){
        return (
            <div className="citem__add" onClick={() => setIsOpen(true)}>
                <div className="citem__plus">
                    <img draggable={false} src={plus}/>
                </div>
            </div>
        )
    }

    const errorRef = useRef(false)

    function addTheme() {
        if(name.length === 0 || arrayNames.includes(name.toLowerCase())){
            if(!error){
                setError(isEn ? "A unique name is required" : "Назва повинна бути унікальною")
                setTimeout(() => {
                    setError(false)
                }, 6000)
            }
            errorRef.current = 1
            return
        }
        if(!/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i.test(url)){
            if(!error){
                setError(isEn ? "Invalid URL" : "Неправильне посилання")
                setTimeout(() => {
                    setError(false)
                }, 6000)
            }
            errorRef.current = 2
            return
        }
        const array = [...localThemes]
        array.push(`${name}@${url}`)
        localStorage.setItem("custom-themes", array.join("^"))
        setError(false)
        setIsOpen(false)
        setName("")
        setUrl("")
        setArray(array.map(el => el.split("@")))
    }
    return (
        <div className="custom">
            <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} isEn={isEn} error={error} name={name} setName={setName} url={url} setUrl={setUrl} addTheme={addTheme} errorRef={errorRef}/>
            <h3>{isEn ? "Custom themes" : "Власні теми"}</h3>
            <div className="custom__list">
                {array.map((el) => <CustomItem key={el[0]} name={el[0]} src={el[1]} setArray={setArray} onChange={onChange}/>)}
                <CustomAdd/>
            </div>
        </div>
    )
}