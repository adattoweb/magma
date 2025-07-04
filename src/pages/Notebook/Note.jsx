import "./Note.css";
import "./Projects.css";

import { useState} from "react";
import NoteStart from "./components/NoteStart";
import NoteList from "./components/NoteList";

export default function Notebook() {
    if (!localStorage.getItem("note-index")) {
        localStorage.setItem("note-index", "0");
    }
    if (!localStorage.getItem("tracker-projects")) {
        localStorage.setItem("tracker-projects", "Без проєкту");
    }
    const [isAdding, setIsAdding] = useState(false); // чисто щоб рендерити наново компонент
    return (
        <div className="trackers content project note">
            <NoteStart update={() => setIsAdding(!isAdding)} />
            <NoteList />
        </div>
    );
}