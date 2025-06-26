import { useState } from "react";

export default function NoteStart({ update }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    function addProject() {
        let smallName = name
        if(!name.length){
            smallName = isEn ? "Without name" : "Без назви"
        } 
        if(name.length > 45) smallName = name.substring(0, 44) + "..."
        let newName = smallName.replace(/(@|\^)+/g, ".");
        let newText = text.replace(/(@|\^)+/g, ".");

        const index = +localStorage.getItem("note-index") 
        localStorage.setItem("note-index", index + 1)
        localStorage.setItem(`note-item${index}`, `${newName}@${newText}`)
    }
    return (
        <div className="trackers__add project__add newblock note__add">
            <div className="trackers__info">
                <input type="text" placeholder={isEn ? "Header" : "Заголовок"} value ={name} onChange={(e) => setName(e.target.value)}/>
                <textarea placeholder={isEn ? "Text" : "Tекст"} value ={text} onChange={(e) => setText(e.target.value)}/>
                <div className="notebutton" onClick={() => {
                    addProject();
                    update();
                }}>{isEn ? "Create note" : "Створити нотатку"}</div>
            </div>
        </div>
    );
}