import { useState} from 'react'
import './Goals.css'
import GoalsStart from './GoalsStart'
import GoalsList from './GoalsList'

export default function Trackers() {
    const isEn = localStorage.getItem("settings-lang") === "en"
    if (localStorage.getItem("goals-index") === null) {
        localStorage.setItem("goals-index", "1")
    }
    if (localStorage.getItem("goals-list") === null) {
        isEn ? localStorage.setItem("goals-list", "Read book@1@1@10") : localStorage.setItem("goals-list", "Прочитати книжку@1@1@10")
        localStorage.setItem("goals-index", "2")
    }
    const [isAdding, setIsAdding] = useState(false) // чисто щоб рендерити наново компонент
    return (
        <div className="trackers content project">
            <GoalsStart update={() => setIsAdding(!isAdding)} />
            <GoalsList />
        </div>
    )
}