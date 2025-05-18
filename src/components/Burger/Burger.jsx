import { useState } from 'react'
import "./Burger.css"

export default function Burger({ onClick }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={isOpen ? "burger-menu active" : "burger-menu"} onClick={() => {
            setIsOpen(!isOpen)
            onClick()
        }}>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
        </div>
    )
}