import SettingsBlock from "./SettingsBlock"
import SettingsItem from "./SettingsItem"
import EditNick from "./EditNick"

import { useState } from "react"
import Dropdown from "@/components/Dropdown/Dropdown";

export default function Main({ onChange }) {
    const localTheme = localStorage.getItem("settings-theme")
    const [isTwelve, setIsTwelve] = useState(localStorage.getItem("magma-clock") === "12")
    const [isQuotesEnabled, setIsQuotesEnabled] = useState(localStorage.getItem("magma-quotes") === "true")
    const [darkness, setDarkness] = useState(+localStorage.getItem("magma-darkness"))
    const [isAuto, setIsAuto] = useState(localTheme === "auto") 
    const isEn = localStorage.getItem("settings-lang") === "en";
    const isDark = localStorage.getItem("settings-theme") === "dark"
    return (
        <div className="maintab"><SettingsBlock header={isEn ? "Main Settings" : "Основні налаштування"}>
            <SettingsItem header={isEn ? "Language" : "Мова"}>
                <div className="settings__select small-drop">
                    <Dropdown name={isEn ? "EN" : "UA"}>
                    <p onClick={() => {
                        localStorage.setItem("settings-lang", "en");
                        onChange();
                    }}>EN</p>
                    <p onClick={() => {
                        localStorage.setItem("settings-lang", "ua");
                        onChange();
                    }}>UA</p>
                    </Dropdown>
                </div>
            </SettingsItem>
            <SettingsItem header={isEn ? "Theme" : "Тема"}>
                <div className="settings__select small-drop">
                    <Dropdown name={isDark ? "Dark" : "Light"}>
                    <p onClick={() => {
                        localStorage.setItem("settings-theme", "light");
                        onChange();
                    }}>Light</p>
                    <p onClick={() => {
                        localStorage.setItem("settings-theme", "dark");
                        onChange();
                    }}>Dark</p>
                    </Dropdown>
                </div>
            </SettingsItem>
            <SettingsItem header={isEn ? "Auto theme" : "Авто тема"}>
                <div className="settings__btn" onClick={() => {
                    if(localTheme !== "auto"){
                        localStorage.setItem("settings-theme", "auto")
                        setIsAuto(true)
                    }
                    else {
                        let now = new Date();
                        (now.getHours() >= 20 || now.getHours <= 6) ? localStorage.setItem("settings-theme", "dark") : localStorage.setItem("settings-theme", "light")
                        setIsAuto(false)
                    }
                    onChange()}}>
                    {isAuto && localTheme === "auto" ? isEn ? "Enabled" : "Увімкнено" : isEn ? "Disabled" : "Вимкнено"}
                </div>
            </SettingsItem>
            <SettingsItem header={isEn ? "Quotes" : "Цитати"}>
                <div className="settings__btn" onClick={() => {
                    setIsQuotesEnabled(!isQuotesEnabled)
                    localStorage.setItem("magma-quotes", `${!isQuotesEnabled ? "true" : "false"}`)
                    onChange()}}>
                    {isQuotesEnabled ? isEn ? "Enabled" : "Увімкнено" : isEn ? "Disabled" : "Вимкнено"}
                </div>
            </SettingsItem>
            <SettingsItem header={isEn ? "Background darkness" : "Темнота фону"}>
                <input type="range" min="5" max="30" step="1" value={darkness} onChange={(e) => {
                    setDarkness(e.target.value)
                    localStorage.setItem("magma-darkness", e.target.value)
                    onChange()
                }} />
            </SettingsItem>
            <SettingsItem header={isEn ? "Clock" : "Годинник"}>
                <div className="settings__select">
                    <p className={isTwelve ? "clock__item active" : "clock__item"} onClick={() => {
                        setIsTwelve(true)
                        localStorage.setItem("magma-clock", "12")
                    }}>12</p>
                    <p className={isTwelve ? "clock__item" : "clock__item active"} onClick={() => {
                        setIsTwelve(false)
                        localStorage.setItem("magma-clock", "24")
                    }}>24</p>
                </div>
            </SettingsItem>
        </SettingsBlock>
            <SettingsBlock header={isEn ? "Edit nickname" : "Змінити нікнейм"}>
                <EditNick />
            </SettingsBlock></div>
    )
}