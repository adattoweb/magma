import { useState } from "react"

export default function EditNick() {
    const [nick, setNick] = useState(localStorage.getItem("magma-name"))
    return (
        <input className="editnick newblock" type="text" placeholder="adattoweb123" value={nick} onChange={(e) => {
            if (e.target.value.length < 20) {
                setNick(e.target.value)
                localStorage.setItem("magma-name", e.target.value)
            }
        }} />
    )
}