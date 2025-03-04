import { useState} from 'react'
import './Trackers.css'
import TrackerStart from './TrackerStart'
import TrackerList from './TrackerList'

export default function Trackers() {
    if (localStorage.getItem("tracker-index") === null) {
        localStorage.setItem("tracker-index", "0")
    }
    if (localStorage.getItem("tracker-projects") === null) {
        localStorage.setItem("tracker-projects", "Без проєкту")
    }
    const [isAdding, setIsAdding] = useState(false) // чисто щоб рендерити наново компонент
    return (
        <div className="trackers content">
            <TrackerStart changeAdd={() => setIsAdding(!isAdding)} />
            <TrackerList />
        </div>
    )
}