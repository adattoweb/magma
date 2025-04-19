import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ onClick }) {

    const [isHidden, setIsHidden] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови

    const scroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 50) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setLastScroll(currentScroll);
    };

    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => window.removeEventListener("scroll", scroll);
    }, [lastScroll]);

    return (
        <div className={`header ${isHidden ? 'hidden' : ""}`}>
            <div className='header__logo'><Link to="/">Magma</Link></div>
            <ul className='header__menu'>
                <li><Link to="/trackers">{isEn ? "Trackers" : "Трекери"}</Link></li>
                <li><Link to="/analytics">{isEn ? "Analytics" : "Аналітика"}</Link></li>
                <li><Link to="/projects">{isEn ? "Projects" : "Проєкти"}</Link></li>
                <li><Link to="/tierlist">{isEn ? "TierList" : "Тірліст"}</Link></li>
                <li><Link to="/goalslist">{isEn ? "Goals" : "Цілі"}</Link></li>
                <li><Link to="/calendar">{isEn ? "Calendar" : "Календар"}</Link></li>
                <li><Link to="/settings">{isEn ? "Settings" : "Налаштування"}</Link></li>
                <li><Link to="/help">{isEn ? "Допомога" : "Допомога"}</Link></li>
            </ul>
            <div className='burger-menu' onClick={onClick}>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>
        </div>
    );
}
