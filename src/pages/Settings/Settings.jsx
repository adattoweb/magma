import "./Settings.css"
import white from "../../assets/white.png"
import black from "../../assets/black.png"
import general from "../../assets/home.png"
import themeIcon from "../../assets/themeIcon.png"
import info from "../../assets/info.png"

import { useState } from 'react'

import Burger from "../../components/Burger/Burger"
import Info from "./components/Info"
import Carousel from "./components/Carousel"
import SettingsBlock from "./components/SettingsBlock"


export default function Settings({ onChange }) {

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [choosed, setChoosed] = useState(+localStorage.getItem("settings-bg"))

    function EditNick() {
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
    function TabItem({ isActive, setActive, children }) {
        return (
            <div className={isActive ? "tab__item active" : "tab__item"} onClick={setActive}>{children}</div>
        )
    }
    const [tabSelect, setTabSelect] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    function Tab() {
        return (
            <>
                <div className="tab__burger newblock">
                    <Burger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                </div>
                <div className={isOpen ? "tab active newblock" : "tab newblock"}>
                    <div className={isOpen ? "tab__list active" : "tab__list"}>
                        <TabItem isActive={0 === tabSelect} setActive={() => { setTabSelect(0) }}><img src={general} alt="general settings icon" /> {isEn ? "General" : "Загальне"}</TabItem>
                        <TabItem isActive={1 === tabSelect} setActive={() => { setTabSelect(1) }}><img src={themeIcon} alt="customize settings icon" /> {isEn ? "Customize" : "Кастомізація"}</TabItem>
                        <TabItem isActive={2 === tabSelect} setActive={() => { setTabSelect(2) }}><img src={info} alt="info settings icon" /> {isEn ? "Info" : "Інформація"}</TabItem>
                    </div>
                </div>
            </>
        )
    }
    if(!localStorage.getItem("magma-clock")) localStorage.setItem("magma-clock", "24")
    const [isTwelve, setIsTwelve] = useState(localStorage.getItem("magma-clock") === "12")
    if(!localStorage.getItem("magma-quotes")) localStorage.setItem("magma-quotes", "true")
    const [isQuotesEnabled, setIsQuotesEnabled] = useState(localStorage.getItem("magma-quotes") === "enabled")

    return (
        <div className="settings content">
            <div className="settings__main newblock">
                <Tab />
                <div>
                    {tabSelect === 0 && <><SettingsBlock header={isEn ? "Main Settings" : "Основні налаштування"}>
                        <div className="settings__lang">
                            <p className="settings__name">{isEn ? "Language:" : "Мова:"}</p>
                            <div className="settings__select">
                                <p className="lang__select" onClick={() => {
                                    localStorage.setItem("settings-lang", "en");
                                    onChange();
                                }}>EN</p>
                                <p className="lang__select" onClick={() => {
                                    localStorage.setItem("settings-lang", "ua");
                                    onChange();
                                }}>UA</p>
                            </div>
                        </div>
                        <div className="settings__theme settings__lang">
                            <p className="settings__name">{isEn ? "Theme:" : "Тема:"}</p>
                            <div className="settings__select">
                                <img src={white} onClick={() => {
                                    localStorage.setItem("settings-theme", "light");
                                    onChange();
                                }} />
                                <img src={black} onClick={() => {
                                    localStorage.setItem("settings-theme", "dark");
                                    onChange();
                                }} />
                            </div>
                        </div>
                        <div className="settings__theme settings__lang">
                            <p className="settings__name">{isEn ? "Clock:" : "Годинник:"}</p>
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
                        </div>
                        <div className="settings__theme settings__lang">
                            <p className="settings__name">{isEn ? "Quotes:" : "Цитати:"}</p>
                            <div className="settings__btn" onClick={() => {
                                setIsQuotesEnabled(!isQuotesEnabled)
                                localStorage.setItem("magma-quotes", `${!isQuotesEnabled ? "true" : "false"}`)
                                onChange()
                            }}>
                                {isQuotesEnabled ? "Enabled" : "Disabled"}
                            </div>
                        </div>
                    </SettingsBlock>
                        <SettingsBlock header={isEn ? "Edit nickname" : "Змінити нік"}>
                            <EditNick />
                        </SettingsBlock></>}
                    {tabSelect === 1 && <SettingsBlock header={isEn ? "Background image" : "Фонове зображення"}>
                        <Carousel choosed={choosed} setChoosed={setChoosed}/>
                    </SettingsBlock>}
                    {tabSelect === 2 && <>
                        <SettingsBlock>
                            <Info/>
                        </SettingsBlock>
                        <SettingsBlock header={isEn ? "Version" : "Версія"}>
                            <p className="settings__name">{isEn ? "Current version: Magma Local 0.5.5" : "Поточна версія: Magma Local 0.5.5"}</p>
                            <p className="settings__name">{isEn ? "Read the latest changes here:" : "Прочитати останні зміни можна:"} <a href="#">adattoweb.xyz</a></p>
                        </SettingsBlock>
                        <SettingsBlock header={isEn ? "Developer Contacts" : "Контакти розробника"}>
                            <p className="settings__name">{isEn ? "Discord: @adattoweb" : "Діскорд: @adattoweb"}</p>
                        </SettingsBlock>
                    </>}
                </div>
            </div>
        </div>
    );
}
