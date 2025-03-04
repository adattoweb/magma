import "./Menu.css"
import React from 'react';
import cross from '../assets/cross.png'
import { Link } from 'react-router-dom';

export default function Menu({ isMenu, onClick }) {

    const isEn = localStorage.getItem("settings-lang") === "en";

    return (
        <div className={isMenu ? 'menu' : 'menu none'}>
            <img src={cross} className="cross" onClick={onClick} />
            <ul className="menu__list" onClick={onClick}>
                <li><Link to="/trackers">{isEn ? "Trackers" : "Трекери"}</Link></li>
                <li><Link to="/analytics">{isEn ? "Analytics" : "Аналітика"}</Link></li>
                <li><Link to="/projects">{isEn ? "Projects" : "Проєкти"}</Link></li>
                <li><Link to="/tierlist">{isEn ? "TierList" : "Тірліст"}</Link></li>
                <li><Link to="/goalslist">{isEn ? "Goals" : "Цілі"}</Link></li>
                <li><Link to="/calendar">{isEn ? "Calendar" : "Календар"}</Link></li>
                <li><Link to="/settings">{isEn ? "Settings" : "Налаштування"}</Link></li>
            </ul>
        </div>
    )
}