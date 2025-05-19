import "./Burger.css"

export default function Burger({ isOpen, onClick }) {
    return (
        <div className={isOpen ? "burger-menu active" : "burger-menu"} onClick={() => {
            onClick()
        }}>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
        </div>
    )
}